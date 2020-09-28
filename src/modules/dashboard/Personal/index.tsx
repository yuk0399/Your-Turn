import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
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
  checkboxRoot: {
    marginLeft: -12,
  },
  cardRoot: {
    maxWidth: '36rem',
    width: '100%',
    overflow: 'hidden',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    position: 'relative',
    paddingTop: 20,
    [theme.breakpoints.up('xl')]: {
      paddingTop: 32,
    }
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

const Personal: React.FC = () => {
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
    <Box flex={1} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
    <Card className={classes.cardRoot}>
      <Box px={{xs: 6, sm: 10, xl: 15}}>
        <Box
          component='h2'
          mb={{xs: 3, xl: 6}}
          color='text.primary'
          fontFamily={Fonts.LIGHT}
          fontSize={{xs: 24, xl: 30}}>
          アカウント設定
        </Box>
      </Box>
    <Box flex={1} display='flex' flexDirection='column'>
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
              <GridContainer>
                <Grid item xs={12} md={6}>
                  <Box mb={{xs: 5, xl: 8}}>
                    <MyTextField
                      label={<IntlMessages id='common.password' />}
                      name='password'
                      type='password'
                      variant='outlined'
                      className={classes.myTextFieldRoot}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box mb={{xs: 4, xl: 8}}>
                    <MyTextField
                      label={<IntlMessages id='common.retypePassword' />}
                      name='confirmPassword'
                      type='password'
                      variant='outlined'
                      className={classes.myTextFieldRoot}
                    />
                  </Box>
                </Grid>
              </GridContainer>
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
    </Card>
    </Box>
  );
};

export default Personal;
