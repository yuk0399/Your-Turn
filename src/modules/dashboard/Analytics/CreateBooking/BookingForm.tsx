import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Form, Formik, FormikErrors, useField} from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector} from 'react-redux';
import { onCreateBookingData, onEditSelectedBooking } from '../../../../redux/actions';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {CremaTheme} from '../../../../types/AppContextPropsType';
import {Fonts} from 'shared/constants/AppEnums';
import { BookingData } from 'types/models/Analytics';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { AppState } from 'redux/store';
import { useAuthUser } from '@crema/utility/AppHooks';
import { getNowTimeWithCollon, getTodayStringWithSlash } from 'shared/function/common';

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

const validationSchema2 = yup.object({
    name: yup.string().required('飼い主様名を入力してください。'),
    pet_name1: yup.string().required('ペット名を入力してください。'),
    // content1: yup.string().required('診察内容を選択してください。'),
    // pet_name2: yup.array().of(
    //   yup.lazy((value: any) => {
    //       if (value && value.number >= 2) {
    //         return yup.object().shape({
    //           value: yup.string().required('ペット名を入力してください。'),
    //         });
    //       } else {
    //         return yup.object().shape({
    //           value: yup.string().notRequired(),
    //         });
    //       }
    //   })),
    // content2: yup.array().of(
    //   yup.lazy((value: any) => {
    //       if (value && value.number >= 2) {
    //         return yup.object().shape({
    //           value: yup.string().required('診察内容を選択してください。'),
    //         });
    //       } else {
    //         return yup.object().shape({
    //           value: yup.string().notRequired(),
    //         });
    //       }
    //   })),
});

interface FormValues {
  name?: string;
  number?: number;
  medical_number?: string;
  email?: string;
  pet_name1?: string;
  content1?: string;
  pet_name2?: string;
  content2?: string;
  pet_name3?: string;
  content3?: string;
  pet_name4?: string;
  content4?: string;
  pet_name5?: string;
  content5?: string;
}



interface BookingFormProps {
  userId: string;
  afterBookingAction: () => void;
  bookingData?: BookingData;
  isEdit: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({ userId, afterBookingAction, bookingData, isEdit }) => {
  const dispatch = useDispatch();
  const user = useAuthUser();
  const [petCount, setPetCount] = React.useState(isEdit ? bookingData?.number :1);
  const [waitingCount, setWaitingCount] = React.useState(isEdit ? bookingData?.waiting_count : 1);
  const [content1, setContent1] = React.useState(isEdit ? bookingData?.content1 : '具合が悪い');
  const [content2, setContent2] = React.useState(isEdit ? bookingData?.content2 : '具合が悪い');
  const [content3, setContent3] = React.useState(isEdit ? bookingData?.content3 : '具合が悪い');
  const [content4, setContent4] = React.useState(isEdit ? bookingData?.content4 : '具合が悪い');
  const [content5, setContent5] = React.useState(isEdit ? bookingData?.content5 : '具合が悪い');
  
  const initialValues: FormValues = {
    name: isEdit ? bookingData?.name : '',
    // number: isEdit ? bookingData?.number :1,
    medical_number: isEdit ? (bookingData?.medical_number === '初診' ? '' : bookingData?.medical_number) :'',
    email: isEdit ? bookingData?.email :'',
    // waiting_count: isEdit ? bookingData?.waiting_count : 1,
    pet_name1: isEdit ? bookingData?.pet_name1 :'',
    // content1: isEdit ? bookingData?.content1 :'',
    pet_name2: isEdit ? bookingData?.pet_name2 :'',
    // content2: isEdit ? bookingData?.content2 :'',
    pet_name3: isEdit ? bookingData?.pet_name3 :'',
    // content3: isEdit ? bookingData?.content3 :'',
    pet_name4: isEdit ? bookingData?.pet_name4 :'',
    // content4: isEdit ? bookingData?.content4 :'',
    pet_name5: isEdit ? bookingData?.pet_name5 :'',
    // content5: isEdit ? bookingData?.content5 :'',
  }

  const useStyles = makeStyles((theme: CremaTheme) => ({
    formRoot: {
      textAlign: 'left',
    },
    petInputBox: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 8,
    },
    petBox: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row'
    },
    petName: {
      marginBottom: 8,
      marginTop: 8,
      width: '70%',
      minWidth: 180,
      marginRight: '1%',
    },
    petContent: {
      marginTop: 8,
      marginBottom: 8,
      width: '29%',
      minWidth: 180
    },
    myTextFieldRoot: {
      width: '100%',
    },
    checkboxRoot: {
      marginLeft: -12,
    },
    pointer: {
      cursor: 'pointer',
    },
    formControl: {
      width: '100%',
    },
    formControl2: {
      width: '40%',
    },
    btnRoot: {
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
      width: '10rem',
      // margin: '1rem',
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
  }));
  const classes = useStyles();

  function handleChange1(event: React.ChangeEvent<{value: unknown}>) {
    setContent1(event.target.value as string);
  }
  function handleChange2(event: React.ChangeEvent<{value: unknown}>) {
    setContent2(event.target.value as string);
  }
  function handleChange3(event: React.ChangeEvent<{value: unknown}>) {
    setContent3(event.target.value as string);
  }
  function handleChange4(event: React.ChangeEvent<{value: unknown}>) {
    setContent4(event.target.value as string);
  }
  function handleChange5(event: React.ChangeEvent<{value: unknown}>) {
    setContent5(event.target.value as string);
  }

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const inputLabel1 = React.useRef<HTMLLabelElement>(null);
  const inputLabel2 = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [labelWidth1, setLabelWidth1] = React.useState(0);
  const [labelWidth2, setLabelWidth2] = React.useState(0);
  React.useEffect(() => {
    if (inputLabel && inputLabel?.current && inputLabel?.current?.offsetWidth) {
      setLabelWidth(inputLabel.current.offsetWidth);
    }
    if (inputLabel1 && inputLabel1?.current && inputLabel1?.current?.offsetWidth) {
      setLabelWidth1(inputLabel1.current.offsetWidth);
    }
    if (inputLabel2 && inputLabel2?.current && inputLabel2?.current?.offsetWidth) {
      setLabelWidth2(inputLabel2.current.offsetWidth);
    }
  }, []);

  // const validationSchema2={yup.lazy(values => {
  //   if (values.number === 'noPet') {
  //       return yup.object().shape({
  //         name: yup.string().required('飼い主様名を入力してください。'),
  //         email: yup.string().email('メールアドレスの形式に誤りがあります。'),
  //         pet_name1: yup.string().required('ペット名を入力してください。'),
  //       });
  //   } else {
  //       return yup.object().shape({
  //         name: yup.string().required('飼い主様名を入力してください。'),
  //         email: yup.string().email('メールアドレスの形式に誤りがあります。'),
  //         pet_name1: yup.string().required('ペット名を入力してください。'),
  //       });
  //   }
  //   })}

  const validationSchema = yup.object({
    name: yup.string().required('飼い主様名を入力してください。'),
    email: yup.string().email('メールアドレスの形式に誤りがあります。'),
    pet_name1: yup.string().required('ペット名を入力してください。'),
    // content1: yup.string().required('診察内容を選択してください。'),
    // pet_name2: yup.string().notRequired(),
    // content2: yup.string().notRequired(),
    // pet_name2: yup.string().required('ペット名を入力してください。').transform(value => {
    //   // If any child property has a value, skip the transform
    //   if (petCount > 1) {
    //     return value;
    //   }
    //   // Transform the value to undefined
    //   return undefined;
    // }),
        // yup.lazy(value => {
        //     // if (petCount > 1) {
        //       return yup.object().shape({
        //         value: yup.string().required('ペット名を入力してください。'),
        //       });
        //     // } else {
        //     //   return yup.object().shape({
        //     //     pet_name2: yup.string().notRequired(),
        //     //   });
        //     // }
        // }),
  });

  return (
    
    <Box flex={1} display='flex' flexDirection='column'>
    <Box
          mt={3}
          ml={3}
          mb={3}
          component='h4'
          fontFamily={Fonts.MEDIUM}
          className='font-bold'
          >
          診療予約受付
        </Box>
      <Box
        px={{xs: 6, sm: 10, xl: 15}}
        pt={{xs: 8, xl: 12}}
        flex={1}
        display='flex'
        flexDirection='column'>
        <Formik
          enableReinitialize
          validateOnChange={true}
          initialValues={initialValues}
          // validationSchema={validationSchema}
          validate={(values: FormValues) => {
            let errors: FormikErrors<FormValues> = {};
            if(!values.name) {
              errors.name = '飼い主様名を入力してください。';
            }
            if(!values.pet_name1) {
              errors.pet_name1 = 'ペット名を入力してください。';
            }
            if(petCount && petCount > 1 && !values.pet_name2) {
              errors.pet_name2 = 'ペット名を入力してください。';
            }
            if(petCount && petCount > 2 && !values.pet_name3) {
              errors.pet_name3 = 'ペット名を入力してください。';
            }
            if(petCount && petCount > 3 && !values.pet_name4) {
              errors.pet_name4 = 'ペット名を入力してください。';
            }
            if(petCount && petCount > 4 && !values.pet_name5) {
              errors.pet_name5 = 'ペット名を入力してください。';
            }
            
            return errors;
          }}

          onSubmit={(data, {setErrors, setSubmitting, resetForm}) => {
            console.log('onSubmit')
              setSubmitting(true);
              
              // setErrors({ pet_name2: 'This is a dummy procedure error' });
              // setErrors({ content2: 'This is a dummy procedure error' });
              // setSubmitting(false);
              // return;

              if  (isEdit) {
                  if (bookingData) {
                    bookingData.name = data.name ? data.name : '';
                    bookingData.email = data.email ? data.email : '';
                    bookingData.medical_number = data.medical_number ? ((data.medical_number == '') ? '初診': data.medical_number) : '';
                    bookingData.number = petCount ? petCount : 1;
                    bookingData.waiting_count = waitingCount ? waitingCount : 1;
                    bookingData.content1 = content1 ? content1 : '';
                    bookingData.pet_name1 = data.pet_name1 ? data.pet_name1 : '';
                    bookingData.content2 = content2 ? content2 : '';
                    bookingData.pet_name2 = data.pet_name2 ? data.pet_name2 : '';
                    bookingData.content3 = content3 ? content3 : '';
                    bookingData.pet_name3 = data.pet_name3 ? data.pet_name3 : '';
                    bookingData.content4 = content4 ? content4 : '';
                    bookingData.pet_name4 = data.pet_name4 ? data.pet_name4 : '';
                    bookingData.content5 = content5 ? content5 : '';
                    dispatch(onEditSelectedBooking(bookingData));
                  }
              } else {
                let booking: BookingData = {
                  id: '',
                  orderNumber: 0,
                  name: data.name ? data.name : '',
                  status: 0,
                  email: data.email ? data.email : '',
                  medical_number: data.medical_number ? ((data.medical_number == '') ? '初診': data.medical_number) : '',
                  number: petCount? petCount : 1,
                  waiting_count: waitingCount? waitingCount : 1,
                  content1: content1 ? content1 : '',
                  pet_name1: data.pet_name1 ? data.pet_name1 : '',
                  content2: content2 ? content2 : '',
                  pet_name2: data.pet_name2 ? data.pet_name2 : '',
                  content3: content3 ? content3 : '',
                  pet_name3: data.pet_name3 ? data.pet_name3 : '',
                  content4: content4 ? content4 : '',
                  pet_name4: data.pet_name4 ? data.pet_name4 : '',
                  content5: content5 ? content5 : '',
                  pet_name5: data.pet_name5 ? data.pet_name5 : '',
                  date: getTodayStringWithSlash(),
                  time: getNowTimeWithCollon(),
                  directBooked: (user == null ? false : true),
                  mailGuided: false
                };
                dispatch(onCreateBookingData(booking, true, userId));
              }
              
              setSubmitting(false);
              resetForm();
              setPetCount(1);
              setContent1('');
              setContent2('');
              setContent3('');
              setContent4('');
              setContent5('');
              afterBookingAction();
          }}>
          {({isSubmitting}) => (
            <Form className={classes.formRoot} noValidate autoComplete='off'>
              <Box mb={{xs: 5, xl: 8}}>
                <MyTextField
                  label='飼い主様名'
                  name='name'
                  variant='outlined'
                  className={classes.myTextFieldRoot}
                />
              </Box>
              <Box mb={{xs: 5, xl: 8}}>
                <MyTextField
                  label='診察券番号(初診の場合は空欄)'
                  name='medical_number'
                  variant='outlined'
                  className={classes.myTextFieldRoot}
                />
              </Box>
              <Box mb={{xs: 5, xl: 8}}>
                <MyTextField
                  label='メールアドレス(任意入力)'
                  name='email'
                  variant='outlined'
                  className={classes.myTextFieldRoot}
                />
              </Box>
              <Box mb={{xs: 5, xl: 8}} display='flex' flexDirection='row' alignItems='center'>
                <FormControl variant='outlined' className={classes.formControl2}>
                  <InputLabel ref={inputLabel2} htmlFor='waiting-count'>
                  お知らせ人数
                  </InputLabel>
                  <Select
                    labelWidth={labelWidth2}
                    value={waitingCount}
                    name='waiting_count'
                    inputProps={{
                      name: 'waiting_count',
                      id: 'waiting-count',
                    }}
                    onChange={ e => setWaitingCount(e.target.value ? Number(e.target.value) : 1) }
                    >
                    <MenuItem value='1'>1</MenuItem>
                    <MenuItem value='2'>2</MenuItem>
                    <MenuItem value='3'>3</MenuItem>
                    <MenuItem value='4'>4</MenuItem>
                    <MenuItem value='5'>5</MenuItem>
                  </Select>
                </FormControl>
                <Box>
                　人前に通知する
                </Box>
              </Box>
              <Box 
                  ml={2}
                  mb={6}
                  // color={red[500]}
                  // fontSize={16}
                  fontFamily={Fonts.MEDIUM}>
                お呼び出し順番が近づいてきた際、緊急のお知らせがあった場合はメールでお知らせします。<br/>
                メールアドレスを入力しないお客様は以下の注意点をご確認ください。<br/>
                ・お知らせメールが届きません。<br/>
                ・登録後に表示される予約受付番号をスクリーンショットするか、メモをとるようお願いいたします。
              </Box>
              <Box>
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel ref={inputLabel1} htmlFor='pet-count'>
                  頭数
                  </InputLabel>
                  <Select
                    labelWidth={labelWidth1}
                    value={petCount}
                    inputProps={{
                      name: 'number',
                      id: 'pet-count',
                    }}
                    onChange={ e => setPetCount(e.target.value ? Number(e.target.value) : 1) }
                    >
                    <MenuItem value='1'>1</MenuItem>
                    <MenuItem value='2'>2</MenuItem>
                    <MenuItem value='3'>3</MenuItem>
                    <MenuItem value='4'>4</MenuItem>
                    <MenuItem value='5'>5</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box className={classes.petInputBox}>
                <Box className={classes.petBox}>
                  <Box className={classes.petName}>
                    <MyTextField
                      label='ペット名'
                      name='pet_name1'
                      variant='outlined'
                      className={classes.myTextFieldRoot}
                    />
                  </Box>
                  <Box className={classes.petContent}>
                    <FormControl variant='outlined' className={classes.formControl}>
                      <InputLabel ref={inputLabel} htmlFor='content-selection1'>
                      診察内容
                      </InputLabel>
                      <Select
                        labelWidth={labelWidth}
                        value={content1}
                        onChange={handleChange1}
                        name='content1'
                        inputProps={{
                          name: 'content1',
                          id: 'content-selection1',
                        }}>
                        <MenuItem value='ワクチン'>ワクチン</MenuItem>
                        <MenuItem value='フィラリア予防'>フィラリア予防</MenuItem>
                        <MenuItem value='具合が悪い'>具合が悪い</MenuItem>
                        <MenuItem value='再診'>再診</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box className={classes.petBox} visibility={ (petCount && petCount > 1) ? 'visible' : 'collapse'} height={ (petCount && petCount > 1) ? 'auto' : 5}>
                  <Box className={classes.petName}>
                    <MyTextField
                      label='ペット名'
                      name='pet_name2'
                      variant='outlined'
                      className={classes.myTextFieldRoot}
                    />
                  </Box>
                  <Box className={classes.petContent} >
                    <FormControl variant='outlined' className={classes.formControl}>
                      <InputLabel ref={inputLabel} htmlFor='content-selection2'>
                      診察内容
                      </InputLabel>
                      <Select
                        labelWidth={labelWidth}
                        value={content2}
                        onChange={handleChange2}
                        inputProps={{
                          name: 'content2',
                          id: 'content-selection2',
                        }}>
                        <MenuItem value='ワクチン'>ワクチン</MenuItem>
                        <MenuItem value='フィラリア予防'>フィラリア予防</MenuItem>
                        <MenuItem value='具合が悪い'>具合が悪い</MenuItem>
                        <MenuItem value='再診'>再診</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box className={classes.petBox} visibility={ (petCount && petCount > 2) ? 'visible' : 'collapse'} height={ (petCount && petCount > 2) ? 'auto' : 5}>
                  <Box className={classes.petName}>
                    <MyTextField
                      label='ペット名'
                      name='pet_name3'
                      variant='outlined'
                      className={classes.myTextFieldRoot}
                    />
                  </Box>
                  <Box className={classes.petContent}>
                    <FormControl variant='outlined' className={classes.formControl}>
                      <InputLabel ref={inputLabel} htmlFor='content-selection3'>
                      診察内容
                      </InputLabel>
                      <Select
                        labelWidth={labelWidth}
                        value={content3}
                        onChange={handleChange3}
                        inputProps={{
                          name: 'content3',
                          id: 'content-selection3',
                        }}>
                        <MenuItem value='ワクチン'>ワクチン</MenuItem>
                        <MenuItem value='フィラリア予防'>フィラリア予防</MenuItem>
                        <MenuItem value='具合が悪い'>具合が悪い</MenuItem>
                        <MenuItem value='再診'>再診</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box className={classes.petBox} visibility={ (petCount && petCount > 3) ? 'visible' : 'collapse'} height={ (petCount && petCount > 3) ? 'auto' : 5}>
                  <Box className={classes.petName}>
                    <MyTextField
                      label='ペット名'
                      name='pet_name4'
                      variant='outlined'
                      className={classes.myTextFieldRoot}
                    />
                  </Box>
                  <Box className={classes.petContent}>
                    <FormControl variant='outlined' className={classes.formControl}>
                      <InputLabel ref={inputLabel} htmlFor='content-selection4'>
                      診察内容
                      </InputLabel>
                      <Select
                        labelWidth={labelWidth}
                        value={content4}
                        onChange={handleChange4}
                        inputProps={{
                          name: 'content4',
                          id: 'content-selection4',
                        }}>
                        <MenuItem value='ワクチン'>ワクチン</MenuItem>
                        <MenuItem value='フィラリア予防'>フィラリア予防</MenuItem>
                        <MenuItem value='具合が悪い'>具合が悪い</MenuItem>
                        <MenuItem value='再診'>再診</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box className={classes.petBox} visibility={ (petCount && petCount > 4) ? 'visible' : 'collapse'} height={ (petCount && petCount > 4) ? 'auto' : 5}>
                  <Box className={classes.petName}>
                    <MyTextField
                      label='ペット名'
                      name='pet_name5'
                      variant='outlined'
                      className={classes.myTextFieldRoot}
                    />
                  </Box>
                  <Box className={classes.petContent}>
                    <FormControl variant='outlined' className={classes.formControl}>
                      <InputLabel ref={inputLabel} htmlFor='content-selection5'>
                      診察内容
                      </InputLabel>
                      <Select
                        labelWidth={labelWidth}
                        value={content5}
                        onChange={handleChange5}
                        inputProps={{
                          name: 'content5',
                          id: 'content-selection5',
                        }}>
                        <MenuItem value='ワクチン'>ワクチン</MenuItem>
                        <MenuItem value='フィラリア予防'>フィラリア予防</MenuItem>
                        <MenuItem value='具合が悪い'>具合が悪い</MenuItem>
                        <MenuItem value='再診'>再診</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
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
                  {isEdit ? '更新' : '登録'}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default BookingForm;
