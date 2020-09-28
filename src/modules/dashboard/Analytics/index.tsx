import React, {useEffect, useState} from 'react';
import {Box, Grid} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import GridContainer from '../../../@crema/core/GridContainer';
import InfoView from '../../../@crema/core/InfoView';
import {onGetBookingData} from '../../../redux/actions';
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

const useStyles = makeStyles((theme: CremaTheme) => ({
  colorBtn: {
    fontFamily: Fonts.LIGHT,
    fontSize: 18,
    marginLeft: 4,
  }, 
})); 

const Analitycs = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(onGetBookingData());
  }, [dispatch]);

  const {bookingData} = useSelector<AppState, AppState['dashboard']>(
    ({dashboard}) => dashboard,
  );

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
 
  if (!bookingData?.bookingList) {
    return (
      <Box>読込み中...</Box>
      );
  } else {
    return (
    <>
      <Box mb={6} display='flex' flexDirection='row' justifyContent='flex-end'>
        <FormControlLabel
        control={
          <Switch
            checked={true}
            // onChange={handleChange('checkedB')}
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
      </Box>
      { bookingData?.bookingList && bookingData?.bookingList.length > 0 ? (
        <Box >
          <GridContainer>
          <Grid item md={12}>
              <OrderNTransaction
                bookingData={bookingData}
              />
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
