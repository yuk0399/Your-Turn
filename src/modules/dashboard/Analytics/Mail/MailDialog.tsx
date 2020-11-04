import React, {useState} from 'react';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import Scrollbar from '@crema/core/Scrollbar';
import {useDispatch} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {InfoView} from '../../../../@crema';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import {grey, red} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';
import Chip from '@material-ui/core/Chip';
import { onSendMail } from 'redux/actions/Dashboard';
import { MailContent } from '../../../../types/models/Analytics';

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

const useStyles = makeStyles((theme) => ({
    dialogBox: {
      position: 'relative',
      '& .MuiDialog-paperWidthSm': {
        maxWidth: 600,
        width: '100%',
      },
      '& .MuiTypography-h6': {
        fontFamily: Fonts.LIGHT,
      },
    },
    formRoot: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 20,
      [theme.breakpoints.up('xl')]: {},
    },
    fontBold: {
      fontFamily: Fonts.MEDIUM,
    },
    pointer: {
      cursor: 'pointer',
    },
    textareaAutosizeRoot: {
      width: '100%',
      border: '0 none',
      fontFamily: 'Gilroy-Regular',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    btnRoot: {
      paddingLeft: 32,
      paddingRight: 32,
    },
    scrollRoot: {
      height: 595,
    },
  }));
  
//   const validationSchema = yup.object({
//     to: yup
//       .string()
//       .email(<IntlMessages id='validation.emailFormat' />)
//       .required(<IntlMessages id='validation.emailRequired' />),
//     cc: yup.string().email(<IntlMessages id='validation.emailFormat' />),
//     bcc: yup.string().email(<IntlMessages id='validation.emailFormat' />),
//   });
  
interface MailDialogProps {
    open: boolean;
    sendToList: string[];
    onCloseAction: (x: boolean) => void;
    mailSign: string;
}

const MailDialog: React.FC<MailDialogProps> = ({
    open,
    sendToList,
    onCloseAction,
    mailSign
  }) => {
    const dispatch = useDispatch();
    let user = useAuthUser();
    const classes = useStyles();
  
    return (
      <Dialog
        open={open}
        onClose={() => onCloseAction(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className={classes.dialogBox}>
        <Box
          py={6}
          px={8}
          display='flex'
          flexDirection='row'
          alignItems='center'
          borderBottom={`1px solid ${grey[300]}`}>
          <Box component='h5' mb={0} fontFamily={Fonts.LIGHT}>
            メール送信
          </Box>
        </Box>
        <Scrollbar className={classes.scrollRoot}>
          <Formik
            initialValues={{
              to: sendToList,
              subject: '',
              content: '',
            }}
            // validationSchema={validationSchema}
            onSubmit={(data, {setSubmitting, resetForm}) => {
                // let list = [];
                // list.push(data.to);
                // const mail: MailContent = {
                //     to: data.to,
                //     subject: data.subject,
                //     content: data.content,
                // };
                console.log("MailDialog onSubmit:" + sendToList)
                console.log("mailSign:" + mailSign)
                sendToList.forEach(sendTo => {
                    const mail: MailContent = {
                        to: sendTo,
                        subject: data.subject,
                        content: data.content + (mailSign? "\n\n" + mailSign : '')
                    };
                    dispatch(onSendMail(mail));
                })
                
                resetForm();
                setSubmitting(false);
                onCloseAction(false);
            }}>
                {/* <Box px={8} flex={1}>
                
                </Box> */}
            {({isSubmitting}) => (
              <Form className={classes.formRoot} noValidate autoComplete='off'>
                <Box px={8} flex={1} >
                <Box mb={3} display='flex' flexDirection='row'>
                {sendToList.map((item) => (
                <Box mr={1}>
                    <Chip
                        color='primary'
                        label={item}
                        variant='outlined'
                    />
                </Box>
                ))}
                </Box>
                {/* {(() => {
                    var items: any[] = [];
                    sendToList.forEach(to => {
                        items.push()
                    });
                    return items;
                })()} */}
                
                  <Box mb={3}>
                    <MyTextField
                      placeholder='タイトル'
                      fullWidth
                      margin='normal'
                      name='subject'
                    />
                  </Box>
  
                  <Box mb={3}>
                    <MyTextField
                      multiline
                      className={classes.textareaAutosizeRoot}
                      rows={15}
                      name='content'
                      placeholder='メール内容'
                    />
                  </Box>
                </Box>
  
                <Box px={8} py={4} bgcolor='grey.300'>
                  <Button
                    className={classes.btnRoot}
                    variant='contained'
                    color='secondary'
                    type='submit'
                    disabled={isSubmitting}>
                    送信
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
          <InfoView />
        </Scrollbar>
      </Dialog>
    );
};
export default MailDialog;