import React, {useEffect, useState} from 'react';
import {Box, Grid} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import GridContainer from '../../../@crema/core/GridContainer';
import InfoView from '../../../@crema/core/InfoView';
import {onGetBookingData, onGetConfigData} from '../../../redux/actions';
import OrderNTransaction from './OrderNTransaction';
import {AppState} from '../../../redux/store';
import AppCard from '@crema/core/AppCard';
import AddBookingDialog from './CreateBooking/AddBookingDialog'
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {makeStyles} from '@material-ui/core';
import {CremaTheme} from '../../../types/AppContextPropsType';
import { Fonts } from 'shared/constants/AppEnums';
import MailDialog from './Mail/MailDialog';

const useStyles = makeStyles((theme: CremaTheme) => ({
  colorBtn: {
    fontFamily: Fonts.LIGHT,
    fontSize: 14,
    marginLeft: 4,
  }, 
})); 

const Analitycs = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isMailDialogOpen, setMailDialogOpen] = useState(false);
  const [mailToList, setMailToList] = useState(['']);

  useEffect(() => {
    dispatch(onGetBookingData());
    dispatch(onGetConfigData());
  }, [dispatch]);

  const {bookings: bookingData, config: bookingConfig} = useSelector<AppState, AppState['dashboard']>(
    ({dashboard}) => dashboard,
  );

  const onOpenMailDialog = () => {
    let list: string[] = [];
    bookingData?.bookingList.forEach(booking => {
      if (booking.status === 0 && booking.email) {
        list.push(booking.email);
      }
    })
    console.log("send targets:")
    console.log(list)
    setMailToList(list);
    setMailDialogOpen(true);
  };

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
 
  if (!bookingData?.bookingList) {
    return (
      <Box>読込み中...</Box>
      );
  } else {
    return (
    <>
      {/* <Box mb={6} display='flex' flexDirection='row' justifyContent='flex-end'>
        <FormControlLabel
        control={
          <Switch
            checked={true}
            value='checkedB'
            color='primary'
          />
        }
        label='メール送信'
        />
        <Button
          variant='contained'
          color='primary'
          className={classes.colorBtn}
          onClick={() => setAddDialogOpen(true)}>
          予約の追加
        </Button>
      </Box> */}
      { bookingData?.bookingList && bookingData?.bookingList.length > 0 ? (
        <Box >
          <GridContainer>
          <Grid item md={12}>
              <OrderNTransaction
                bookingData={bookingData}
                bookingConfig={bookingConfig? bookingConfig: {
                  photoUrl: '',
                  open_time1: '',
                  close_time1: '',
                  open_time2: '',
                  close_time2: '',
                  title: '',
                  notes: '',
                  bookingFlg: false,
                  flgDate: '',
                  phone_number: '',
                  mail_sign: ''
                }}
              />
              <Box
                mt={2}
                display='flex'
                flexDirection={{xs: 'column', sm: 'row'}}
                alignItems={{sm: 'center'}}
                justifyContent='flex-end'>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.colorBtn}
                  onClick={() => onOpenMailDialog()}
                  >
                  順番待ちのお客様へ一括メール送信
                </Button>
              </Box>
              {isMailDialogOpen ? (
                <MailDialog 
                  open={isMailDialogOpen} 
                  sendToList={mailToList}
                  onCloseAction={ (value) => setMailDialogOpen(false)}
                  mailSign={(bookingConfig && bookingConfig.mail_sign)? bookingConfig.mail_sign : ''}>
                </MailDialog>
              ) : null}
            </Grid>
          </GridContainer>
        </Box>
      ) : (
        <Box >
          <GridContainer>
            <Grid item md={12}>
            <AppCard
              height={1}
              title="診察予約"
              >
              <p>本日の診察予約はありません。</p>
            </AppCard>
            </Grid>
          </GridContainer>
        </Box>
        )}
      {isAddDialogOpen ? (
        <AddBookingDialog
          open={isAddDialogOpen}
          onCloseAction={setAddDialogOpen}
          onAddAction={() => setAddDialogOpen(true)}
        />
      ) : null}
      <InfoView />
    </>
  );
  }
};

export default Analitycs;
