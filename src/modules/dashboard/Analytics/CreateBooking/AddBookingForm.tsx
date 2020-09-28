import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import { onCreateBookingData } from '../../../../redux/actions';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {makeStyles} from '@material-ui/core/styles';

import {CremaTheme} from '../../../../types/AppContextPropsType';
import {Fonts} from 'shared/constants/AppEnums';
import { BookingData } from 'types/models/Analytics';

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

interface AddBookingFormProps {

}

const AddBookingForm: React.FC<AddBookingFormProps> = ({
  
}) => {
  const dispatch = useDispatch();

  const useStyles = makeStyles((theme: CremaTheme) => ({
    formRoot: {
      textAlign: 'left',
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
          initialValues={{
            name: '',
            number: 1,
            medical_number: '',
            email: '',
            content: '',
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

              let booking: BookingData = {
                orderNumber: 0,
                name: data.name,
                status: 0,
                email: data.email,
                medical_number: (data.medical_number == '') ? '初診': data.medical_number,
                number: data.number,
                content: data.content,
                date: now.getFullYear() + "/" + month + "/" + day,
                time: hour + ":" + min + ":" + sec
              };
              
              dispatch(
                onCreateBookingData(booking)
              );
              setSubmitting(false);
          }}>
          {({isSubmitting}) => (
            <Form className={classes.formRoot} noValidate autoComplete='off'>
              <Box mb={{xs: 5, xl: 8}}>
                <MyTextField
                  label={<IntlMessages id='common.name' />}
                  name='name'
                  variant='outlined'
                  className={classes.myTextFieldRoot}
                />
              </Box>

              <Box mb={{xs: 5, xl: 8}}>
                <MyTextField
                  label='メールアドレス(任意)'
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

                  <Box mb={{xs: 5, xl: 8}}>
                    <MyTextField
                      label='頭数'
                      name='number'
                      variant='outlined'
                      className={classes.myTextFieldRoot}
                    />
                  </Box>
                
                  <Box mb={{xs: 4, xl: 8}}>
                    <MyTextField
                      label='診察目的'
                      name='content'
                      variant='outlined'
                      className={classes.myTextFieldRoot}
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
                  登録
                </Button>
                {/* <Button
                  variant='contained'
                  color='secondary'
                  disabled={isSubmitting}
                  className={classes.btnRoot}
                  onClick={() => onCloseAction(false)}>
                  キャンセル
                </Button> */}
              </Box>
            </Form>
          )}
        </Formik>
      </Box>

      {/* <Box
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
      </Box> */}
    </Box>
    // </Dialog>
  );
};

export default AddBookingForm;
