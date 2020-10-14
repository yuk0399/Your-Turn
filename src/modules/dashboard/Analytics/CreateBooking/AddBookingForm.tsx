import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector} from 'react-redux';
import { onCreateBookingData } from '../../../../redux/actions';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {CremaTheme} from '../../../../types/AppContextPropsType';
import {Fonts} from 'shared/constants/AppEnums';
import { BookingData } from 'types/models/Analytics';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { AppState } from 'redux/store';
import { useAuthUser } from '@crema/utility/AppHooks';

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

const validationSchema = yup.object({
    name: yup.string().required('表示名を入力してください。'),
    email: yup.string().required('メールアドレスを入力してください。'),
    // pet_name1: yup.string().required('ペット名を入力してください。'),
    // pet_name2: yup.string().required('ペット名を入力してください。'),
    // content2: yup.string().required('診察内容を選択してください。'),
    // pet_name3: yup.string().required('ペット名を入力してください。'),
    // content3: yup.string().required('診察内容を選択してください。'),
});

// const validationSchema = yup.lazy<FormValues>((values) => {
//   if (values.number === 3) {
//     return 
//     });
//   } else if (values.number === 2) {
//     return yup.object().shape({
//       name: yup.string().required('表示名を入力してください。'),
//       email: yup.string().required('メールアドレスを入力してください。'),
//       number: yup.string().required('頭数を入力してください。'),
//       pet_name1: yup.string().required('ペット名を入力してください。'),
//       content1: yup.string().required('診察内容を選択してください。'),
//       pet_name2: yup.string().required('ペット名を入力してください。'),
//       content2: yup.string().required('診察内容を選択してください。'),
//       pet_name3: yup.string().required('ペット名を入力してください。'),
//       content3: yup.string().required('診察内容を選択してください。'),
//     });
//   } else {
//     return yup.object().shape({
//       name: yup.string().required('表示名を入力してください。'),
//       email: yup.string().required('メールアドレスを入力してください。'),
//       number: yup.string().required('頭数を入力してください。'),
//       pet_name1: yup.string().required('ペット名を入力してください。'),
//       content1: yup.string().required('診察内容を選択してください。'),
//       pet_name2: yup.string().required('ペット名を入力してください。'),
//       content2: yup.string().required('診察内容を選択してください。'),
//       pet_name3: yup.string().required('ペット名を入力してください。'),
//       content3: yup.string().required('診察内容を選択してください。'),
//     });
//   }
// });

// interface FormValues {
//   name: string;
//   number: number;
//   medical_number: string;
//   email: string;
//   pet_name1: string;
//   content1: string;
//   pet_name2: string;
//   content2: string;
//   pet_name3: string;
//   content3: string;
// }

const initialValues = {
  name: '',
  number: 1,
  medical_number: '',
  email: '',
  pet_name1: '',
  content1: '',
  pet_name2: '',
  content2: '',
  pet_name3: '',
  content3: '',
}

interface AddBookingFormProps {
}

const AddBookingForm: React.FC<AddBookingFormProps> = ({ }) => {
  const dispatch = useDispatch();
  const inputLabel = React.useRef(null);
  const user = useAuthUser();
  const [petCount, setPetCount] = React.useState(1);
  const [content1, setContent1] = React.useState('');
  const [content2, setContent2] = React.useState('');
  const [content3, setContent3] = React.useState('');
  
  const useStyles = makeStyles((theme: CremaTheme) => ({
    formRoot: {
      textAlign: 'left',
    },
    petInputBox: {
      display: 'flex',
      flexDirection: 'column'
    },
    petBox: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row'
    },
    petName: {
      marginBottom: 8,
      width: '70%',
      minWidth: 180
    },
    petContent: {
      marginBottom: 8,
      width: '29%',
      marginLeft: '1%',
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
    btnRoot: {
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
      width: '10rem',
      margin: '1rem',
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
          診療予約の追加
        </Box>
      <Box
        px={{xs: 6, sm: 10, xl: 15}}
        pt={{xs: 8, xl: 12}}
        flex={1}
        display='flex'
        flexDirection='column'>
        <Formik
          validateOnChange={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(data, {setErrors, setSubmitting, resetForm}) => {
            console.log('onSubmit')
              setSubmitting(true);
              var now = new Date();
              var month =  ("0"+(now.getMonth()+1)).slice(-2);
              var day =  ("0"+now.getDate()).slice(-2);
              var hour =  ("0"+now.getHours()).slice(-2);
              var min =  ("0"+now.getMinutes()).slice(-2);
              var sec =  ("0"+now.getSeconds()).slice(-2);
              
              let booking: BookingData = {
                id: '',
                orderNumber: 0,
                name: data.name,
                status: 0,
                email: data.email,
                medical_number: (data.medical_number == '') ? '初診': data.medical_number,
                number: petCount,
                content1: content1,
                pet_name1: data.pet_name1,
                content2: content2,
                pet_name2: data.pet_name2,
                content3: content3,
                pet_name3: data.pet_name3,
                date: now.getFullYear() + "/" + month + "/" + day,
                time: hour + ":" + min + ":" + sec,
                directBooked : (user == null ? false : true)
              };
              
              dispatch(onCreateBookingData(booking));
              setSubmitting(false);
              resetForm();
              setPetCount(1);
              setContent1('');
              setContent2('');
              setContent3('');
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
                  label='メールアドレス'
                  name='email'
                  variant='outlined'
                  className={classes.myTextFieldRoot}
                />
              </Box>
              <Box mb={{xs: 5, xl: 8}}>
                <MyTextField
                  label='診察番号(初診の場合は空欄)'
                  name='medical_number'
                  variant='outlined'
                  className={classes.myTextFieldRoot}
                />
              </Box>
              <Box mb={{xs: 5, xl: 8}} >
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel ref={inputLabel} htmlFor='pet-count'>
                  頭数
                  </InputLabel>
                  <Select
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
                        value={content1}
                        onChange={handleChange1}
                        inputProps={{
                          name: 'content1',
                          id: 'content-selection1',
                        }}>
                        <MenuItem value='ワクチン'>ワクチン</MenuItem>
                        <MenuItem value='フィラリア予防'>フィラリア予防</MenuItem>
                        <MenuItem value='具合が悪い'>具合が悪い</MenuItem>
                        <MenuItem value='再診'>再診</MenuItem>
                        <MenuItem value='その他'>その他</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box className={classes.petBox} visibility={ (petCount > 1) ? 'visible' : 'collapse'}>
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
                        <MenuItem value='その他'>その他</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box className={classes.petBox} visibility={ (petCount > 2) ? 'visible' : 'collapse'}>
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
                        <MenuItem value='その他'>その他</MenuItem>
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
                  登録
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default AddBookingForm;
