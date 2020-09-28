import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Checkbox, Avatar} from '@material-ui/core';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {Scrollbar, ComponentHeader} from '../../../@crema';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import { onCreateBookingData } from '../../../redux/actions';
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
import { BookingData } from 'types/models/Analytics';
import BookingStats from '../Booking/BookingStats';
import {blue, red} from '@material-ui/core/colors';

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
  name: yup
    .string()
    .required('表示名を入力してください。'),
  number: yup
    .string()
    .required('頭数を入力してください。'),
  content: yup
    .string()
    .required('診察内容を選択してください。')
});

const BookingConfig: React.FC = () => {
  const dispatch = useDispatch();
  
  const [userImageURL, setUserImageURL] = React.useState('');
  const classes = useStyles();

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      // setUserImage(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  return (
    <Box flex={1} display='flex' flexDirection='column'>
      <Box flex={1} display='flex' flexDirection='row'>
        <Box mr={2}
          display='flex'
          flexDirection='column'
          alignItems={{sm: 'space-around'}}
          justifyContent={{sm: 'flex-start'}}>
          <Box my={2}>
            <Button
              variant='contained'
              color='primary'
              className={classes.btnRoot}>
              受付を開始する
            </Button>
          </Box>
          <Box my={2}>
            <Button
              variant='contained'
              color='secondary'
              className={classes.btnRoot}>
              受付を終了する
            </Button>
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" textAlign='center' className="booking-numbers-box">
          <Box mx={2}>
            <BookingStats
              bgColor={red[500]}
              num={4}
              heading={"お呼び出し中"}
              unit={"番"}
          />
          </Box>
          <Box mx={2}>
            <BookingStats
                bgColor={blue[500]}
                num={8}
                heading={"お待ちの人数"}
                unit={"人"}
              />
            </Box>
        </Box>
      </Box>

      <Box p={5} borderBottom={`1px solid ${grey[300]}`}></Box>
      <Box
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
              <Avatar variant="square" className={classes.avatar} src={userImageURL} />
            </label>
          </Box>
        </Box>
      </Box>
      <Box p={5} borderBottom={`1px solid ${grey[300]}`}></Box>
      <Box
        px={{xs: 3, sm: 5, xl: 7}}
        pt={{xs: 4, xl: 6}}
        flex={1}
        display='flex'
        flexDirection='column'>
        <Formik
          validateOnChange={true}
          initialValues={{
            name: '',
            title: '当院からのお知らせ',
            notes: 'インフルエンザが流行しています。うがい手洗いで予防を心がけてください。',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setErrors, setSubmitting}) => {
              setSubmitting(true);
              var now = new Date();
              var month =  ("0"+(now.getMonth()+1)).slice(-2);
              var day =  ("0"+now.getDate()).slice(-2);
              var hour =  ("0"+now.getHours()).slice(-2);
              var min =  ("0"+now.getMinutes()).slice(-2);
              var sec =  ("0"+now.getSeconds()).slice(-2);

              // let booking: BookingData = {
              //   orderNumber: 0,
              //   name: data.name,
              //   status: 0,
              //   email: data.email,
              //   medical_number: (data.medical_number == '') ? '初診': data.medical_number,
              //   number: data.number,
              //   content: data.content,
              //   date: now.getFullYear() + "/" + month + "/" + day,
              //   time: hour + ":" + min + ":" + sec
              // };
              
              // dispatch(
              //   onCreateBookingData(booking)
              // );
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
                <Box mr={4}  width="100%">
                <MyTextField
                  label='自動受付開始時間'
                  name='open_time'
                  variant='outlined'
                  className={classes.myTextField}
                  type='time'
                  defaultValue='09:00'
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
                  label='自動受付終了時間'
                  name='close_time'
                  variant='outlined'
                  className={classes.myTextField}
                  type='time'
                  defaultValue='16:00'
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
    </Box>
  );
};

export default BookingConfig;
