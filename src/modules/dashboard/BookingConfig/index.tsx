import React, {useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Checkbox, Avatar} from '@material-ui/core';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar, ComponentHeader, InfoView} from '../../../@crema';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import {Link} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {useDropzone} from 'react-dropzone';
import Grid from '@material-ui/core/Grid';
import {GridContainer} from '../../../@crema';
import grey from '@material-ui/core/colors/grey';
import {CremaTheme} from '../../../types/AppContextPropsType';
import {Fonts} from 'shared/constants/AppEnums';
import { BookingConfig, BookingData } from 'types/models/Analytics';
import BookingStats from '../Booking/BookingStats';
import {blue, red} from '@material-ui/core/colors';
import {onGetBookingData, onGetConfigData, onGetUserInfo, onUpdateBookingConfig, onUpdateBookingDate, onUpdateBookingFlg} from '../../../redux/actions';
import {AppState} from '../../../redux/store';
import { getTodayString, getTodayStringWithSlash } from 'shared/function/common';
import { useAuthUserAndInfo } from '@crema/utility/AppHooks';

const MyTextField = (props: any) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const useStyles = makeStyles((theme: CremaTheme) => ({
  avatar: {
    width: 240,
    height: 120,
    marginBottom: 8,
    cursor: 'pointer',
  },
  formRoot: {
    textAlign: 'left',
  },
  myTextFieldRoot: {
    width: '100%',
  },
  myTextField: {
    width: '100%',
    marginBottom: 8,
    [theme.breakpoints.up('xl')]: {
      marginBottom: 16,
    },
    backgroundColor: theme.palette.background.paper,
  },
  checkboxRoot: {
    marginLeft: -12,
  },
  pointer: {
    cursor: 'pointer',
  },
  btnRoot: {
    borderRadius: theme.overrides.MuiCard.root.borderRadius,
    width: '10rem',
    margin: '0.0rem',
    fontFamily: Fonts.LIGHT,
    fontSize: 16,
    textTransform: 'capitalize',
    [theme.breakpoints.up('sm')]: {
      fontSize: 18,
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 20,
    },
  },
  btnStart: {
    borderRadius: theme.overrides.MuiCard.root.borderRadius,
    width: '20rem',
    margin: '0.0rem',
    fontFamily: Fonts.LIGHT,
    fontSize: 16,
    textTransform: 'capitalize',
    [theme.breakpoints.up('sm')]: {
      fontSize: 18,
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 20,
    },
  },
  dividerRoot: {
    marginBottom: 10,
    marginLeft: -48,
    marginRight: -48,
    [theme.breakpoints.up('xl')]: {
      marginBottom: 20,
    },
  },
  iconButtonRoot: {
    marginLeft: 4,
    marginRight: 4,
    color: theme.palette.grey[500],
    '&:hover, &:focus': {
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: 8,
      marginRight: 8,
    },
  },
  textLg: {
    fontSize: 18,
  },
  textPrimary: {
    color: theme.palette.text.primary,
  },
  colorTextPrimary: {
    color: theme.palette.primary.main,
  },
  underlineNone: {
    textDecoration: 'none',
  },
  textGrey: {
    color: theme.palette.grey[500],
  },
  fieldRoot: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
}));

const validationSchema = yup.object({
  open_time1: yup
    .string()
    .required('自動受付開始時間を入力してください。'),
  close_time1: yup
    .string()
    .required('自動受付終了時間を入力してください。'),
  open_time2: yup
    .string()
    .required('自動受付開始時間を入力してください。'),
  close_time2: yup
    .string()
    .required('自動受付終了時間を入力してください。'),
  title: yup
    .string()
    .required('タイトルを入力してください。'),
  notes: yup
    .string()
    .required('お知らせ内容を入力してください。')
});

const BookingConfigForm: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  
  useEffect(() => {
    dispatch(onGetBookingData());
    dispatch(onGetConfigData());
    dispatch(onGetUserInfo());
  }, [dispatch]);

  const {bookings: bookingData, config: bookingConfig} = useSelector<AppState, AppState['dashboard']>(
    ({dashboard}) => dashboard
  );

  const [userImageURL, setUserImageURL] = React.useState(bookingConfig?.photoUrl);
  const userData = useAuthUserAndInfo();
  
  const getCallingNumber = () => {
    if (bookingData) {
      var list = bookingData.bookingList.slice();

      var firstOne = list.filter(function (booking) {
        return booking.status === 0;
      }).sort(function(a, b) {
        if (a.orderNumber > b.orderNumber) {
          return 1;
        } else {
          return -1;
        }
      }).shift();

      return firstOne ? firstOne.orderNumber : 0;
    } else {
      return 0;
    }
  };

  const getWaitingCount = () => {
    if (bookingData) {
      return bookingData.bookingList.filter(function (booking) {
        return booking.status === 0;
      }).length;
    } else {
      return 0;
    }
  };

  const getOptionString = () => {
    let msg = '';
    if (bookingData) {
      let suspensionCount =  bookingData.bookingList.filter(function (booking) {
                              return booking.status === 2;}).length;
      if (suspensionCount > 0)
        msg = "(" + suspensionCount + "人保留)"
    }
    return msg;
  };

  const getBookingDisabled = () => {
    let flg = false;
    var date = getTodayStringWithSlash();
    console.log('bookingFlg:' + bookingConfig?.bookingFlg)
    console.log('flgDate:' + bookingConfig?.flgDate)
    if (bookingConfig?.bookingFlg && bookingConfig?.flgDate === date) {
      flg = true;
    }

    console.log('flg:' + flg)
    return flg;
  };

  const onUpdateBookingDisabled = (flg: boolean) => {
    dispatch(onUpdateBookingFlg(flg));
  };

  const isPushedToday = () => {
    var date = getTodayString();
    // console.log('isPushedToday: ' + date + ', ' + userData?.userInfo?.signinDate);
    return (userData?.userInfo?.signinDate === date);
  };
  
  const onUpdateBookingStartDate = () => {
    dispatch(onUpdateBookingDate());
  };

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      // setUserImage(URL.createObjectURL(acceptedFiles[0]));
    },
  });



  return (
    <Box flex={1} display='flex' flexDirection='column'>
      <Box mb={5}>
        <Button
          variant='contained'
          color='primary'
          disabled={isPushedToday()}
          onClick={() => onUpdateBookingStartDate()}
          className={classes.btnStart}>
          本日の受付を有効にする
        </Button>
      </Box>
      <Box px={5} borderBottom={`1px solid ${grey[300]}`}></Box>
      <Box my={5} flex={1} display='flex' flexDirection='row'>
        <Box mr={2}
          display='flex'
          flexDirection='column'
          alignItems={{sm: 'space-around'}}
          justifyContent={{sm: 'flex-start'}}>
          <Box my={2}>
            <Button
              variant='contained'
              color='primary'
              disabled={getBookingDisabled()===false}
              onClick={() => onUpdateBookingDisabled(false)}
              className={classes.btnRoot}>
              受付を再開
            </Button>
          </Box>
          <Box my={2}>
            <Button
              variant='contained'
              color='secondary'
              disabled={(getBookingDisabled())}
              onClick={() => onUpdateBookingDisabled(true)}
              className={classes.btnRoot}>
              受付を一時停止
            </Button>
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" textAlign='center' className="booking-numbers-box">
          <Box mx={2}>
            <BookingStats
              bgColor={red[500]}
              num={getCallingNumber()}
              heading={"お呼び出し中"}
              unit={"番"}
          />
          </Box>
          <Box mx={2}>
            <BookingStats
                bgColor={blue[500]}
                num={getWaitingCount()}
                heading={"お待ちの人数"}
                unit={"人"}
                option={getOptionString()}
              />
            </Box>
        </Box>
      </Box>

      {/* <Box p={5} borderBottom={`1px solid ${grey[300]}`}></Box> */}
      {/* <Box
        px={{xs: 3, sm: 5, xl: 7}}
        pt={{xs: 4, xl: 6}}
        mb={1}
        flex={1}
        display='flex'
        flexDirection='column'>
        <ComponentHeader
            title='待受画面表示画像'
            description='お客様の受付画面に表示される画像を設定します。'
            refUrl=''
          />
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='flex-start'
          alignItems='flex-start'
          >
          <Box {...getRootProps({className: 'dropzone'})} >
            <input {...getInputProps()} />
            <label htmlFor='icon-button-file'>
              <Avatar variant="square" className={classes.avatar} src={bookingConfig ? bookingConfig.photoUrl : ''} />
            </label>
          </Box>
        </Box>
      </Box> */}
      <Box px={5} borderBottom={`1px solid ${grey[300]}`}></Box>
      <Box
        px={{xs: 3, sm: 5, xl: 7}}
        pt={{xs: 4, xl: 6}}
        flex={1}
        display='flex'
        flexDirection='column'>
        <Formik
          enableReinitialize
          validateOnChange={true}
          initialValues={{          
            photoUrl: bookingConfig?.photoUrl,
            open_time1: bookingConfig?.open_time1,
            close_time1: bookingConfig?.close_time1,
            open_time2: bookingConfig?.open_time2,
            close_time2: bookingConfig?.close_time2,
            title: bookingConfig?.title,
            notes: bookingConfig?.notes,
            phone_number: bookingConfig?.phone_number,
            mail_sign: bookingConfig?.mail_sign
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setErrors, setSubmitting}) => {
              setSubmitting(true);
              let config: BookingConfig = {
                photoUrl: userImageURL ? userImageURL : '', 
                open_time1: data.open_time1 ? data.open_time1 : '',
                close_time1: data.close_time1 ? data.close_time1 : '',
                open_time2: data.open_time2 ? data.open_time2 : '',
                close_time2: data.close_time2 ? data.close_time2 : '',
                title: data.title ? data.title : '',
                notes: data.notes ? data.notes : '',
                bookingFlg: false,
                flgDate: '',
                phone_number: data.phone_number ? data.phone_number : '',
                mail_sign: data.mail_sign ? data.mail_sign : ''
              }
              dispatch(onUpdateBookingConfig(config));
              setSubmitting(false);
          }}>
          {({isSubmitting}) => (
            <Form className={classes.formRoot} noValidate autoComplete='off'>
              <ComponentHeader
                title='待受表示設定'
                description='当日ログイン済み、かつ自動受付時間内の場合に受診受付が有効になります。'
                refUrl=''
              />
              <Box mb={{xs: 1, xl: 2}} 
              display='flex'
              flexDirection={{xs: 'column', sm: 'row'}}
              justifyContent='center'
              alignItems='center'>
                <Box width="50%">
                  自動受付時間１
                </Box>
                <Box mr={4}  width="100%">
                <MyTextField
                  label='開始時間'
                  name='open_time1'
                  variant='outlined'
                  className={classes.myTextField}
                  type='time'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 600,
                  }}
                />
                </Box>
                <Box width="100%">
                <MyTextField
                  label='終了時間'
                  name='close_time1'
                  variant='outlined'
                  className={classes.myTextField}
                  type='time'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 600,
                  }}
                />
                </Box>
              </Box> 
              <Box mb={{xs: 1, xl: 2}} 
              display='flex'
              flexDirection={{xs: 'column', sm: 'row'}}
              justifyContent='center'
              alignItems='center'>
                <Box width="50%">
                  自動受付時間２
                </Box>
                <Box mr={4}  width="100%">
                <MyTextField
                  label='開始時間'
                  name='open_time2'
                  variant='outlined'
                  className={classes.myTextField}
                  type='time'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 600,
                  }}
                />
                </Box>
                <Box width="100%">
                <MyTextField
                  label='終了時間'
                  name='close_time2'
                  variant='outlined'
                  className={classes.myTextField}
                  type='time'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 600,
                  }}
                />
                </Box>
              </Box> 
              <Box mb={{xs: 4, xl: 8}}>
                <MyTextField
                  name='title'
                  label='タイトル'
                  variant='outlined'
                  className={classes.fieldRoot}
                />
              </Box>
              <Box mb={{xs: 4, xl: 8}}>
                <MyTextField
                  name='notes'
                  multiline
                  className={classes.fieldRoot}
                  rows='6'
                  variant='outlined'
                  placeholder='受付画面表示メッセージ'
                />
              </Box>
              <Box mb={4} borderBottom={`1px solid ${grey[300]}`}></Box>
              <ComponentHeader
                title='メール設定'
                description='お客様への送信メールに使用する情報を設定します。'
                refUrl=''
              />
              <Box mb={{xs: 5, xl: 8}}>
                <MyTextField
                  label='電話番号'
                  name='phone_number'
                  variant='outlined'
                  className={classes.myTextField}
                />
              </Box>
              <Box mb={{xs: 4, xl: 8}}>
                <MyTextField
                  name='mail_sign'
                  multiline
                  className={classes.fieldRoot}
                  rows='6'
                  variant='outlined'
                  placeholder='署名'
                />
              </Box>
              <Box
                mb={6}
                display='flex'
                flexDirection={{xs: 'column', sm: 'row'}}
                alignItems={{sm: 'center'}}
                justifyContent={{sm: 'space-between'}}>
                <Button
                  variant='contained'
                  color='primary'
                  disabled={isSubmitting}
                  className={classes.btnRoot}
                  type='submit'>
                  更新
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>

      <Box
        bgcolor={grey[100]}
        px={{xs: 6, sm: 10, xl: 15}}
        py={{xs: 2, xl: 4}}
        display='flex'
        flexDirection={{xs: 'column', sm: 'row'}}
        justifyContent='center'
        alignItems='center'>
        <Box
          component='span'
          className={classes.textGrey}
          mr={{sm: 4}}
          fontSize={18}>
        </Box>
      </Box>
      <InfoView />
    </Box>
  );
};

export default BookingConfigForm;
