import React, {useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import { onGetUserInfo, onUpdateNameAndPassword, showMessage } from '../../../redux/actions';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {makeStyles} from '@material-ui/core/styles';
import {useDropzone} from 'react-dropzone';
import Grid from '@material-ui/core/Grid';
import {GridContainer, InfoView} from '../../../@crema';
import grey from '@material-ui/core/colors/grey';
import {CremaTheme} from '../../../types/AppContextPropsType';
import {Fonts} from 'shared/constants/AppEnums';
import { useAuthUserAndInfo } from '@crema/utility/AppHooks';
import {auth as firebaseAuth} from '@crema/services/auth/firebase/firebase';
import {AppState} from '../../../redux/store';

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
  password: yup
    .string()
    .required('パスワードを入力してください。'),
  confirmPassword: yup
    .string()
    .required('パスワードを入力してください。')
});

const Personal: React.FC = () => {
  const dispatch = useDispatch();
  // const {user, userInfo} = useSelector<AppState, AppState['auth']>(({auth}) => auth);
  const [userImageURL, setUserImageURL] = React.useState('');
  const classes = useStyles();

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      // setUserImage(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  useEffect(() => {
    dispatch(onGetUserInfo());
  }, [dispatch]);

  const userData = useAuthUserAndInfo();
  const defaultPassword = 'dummy';

  return (
    <Box padding={'20px'}>
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
          enableReinitialize
          validateOnChange={true}
          initialValues={{
            name: userData?.userInfo?.displayName,
            password: defaultPassword,
            confirmPassword: defaultPassword,
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setErrors, setSubmitting}) => {
            console.log("onSubmit:" + data.name)
            if(data.password === data.confirmPassword) {
              setSubmitting(true);
              let password = (data.password === defaultPassword) ? '' : data.password;
              dispatch(onUpdateNameAndPassword(data.name ? data.name : '', password));
              setSubmitting(false);
            } else {
              dispatch(showMessage("パスワードが一致しません。"));
            }
          }}>
          {({isSubmitting}) => (
            <Form className={classes.formRoot} noValidate autoComplete='off'>
              <Box mb={{xs: 5, xl: 8}}>
                <MyTextField
                  placeholder='表示名'
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
    <InfoView/>
    </Box>
  );
};

export default Personal;
