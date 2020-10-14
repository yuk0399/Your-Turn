import React, {useEffect} from 'react';
import QRCode from 'qrcode.react';
import AddBookingForm from '../Analytics/CreateBooking/AddBookingForm';
import AfterBooking from '../Analytics/CreateBooking/AfterBooking';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from 'shared/constants/AppEnums';
import { CremaTheme } from 'types/AppContextPropsType';
import BookingStats from './BookingStats';
import {blue, red, grey} from '@material-ui/core/colors';
import { Avatar } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import {onGetBookingData, onGetConfigData} from '../../../redux/actions';
import {AppState} from '../../../redux/store';
import InfoView from '@crema/core/InfoView';
import { useHistory } from 'react-router-dom';
import { useAuthUser } from '@crema/utility/AppHooks';
import StopBooking from './StopBooking';

const useStyles = makeStyles((theme: CremaTheme) => ({
  avatar: {
    width: 180,
    height: 90,
    marginBottom: 8,
  },
  stopBooking: {
    width: '98%',
    marginTop: 16,
    marginBottom: 8,
  },
  headerBox: {
    minWidth: 90,
    marginBottom: 8,
  },
  statsbox: {
    marginTop: 8,
    marginBottom: 8,
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  btnPrimary: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontFamily: Fonts.LIGHT,
    fontSize: 16,
    lineHeight: '16px',
    [theme.breakpoints.up('sm')]: {
      lineHeight: '20px',
    },
    [theme.breakpoints.up('xl')]: {
      lineHeight: '26px',
    },
  },
}));

const Booking = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useAuthUser();
  
  useEffect(() => {
    var uid = '';
    if (history.location.pathname.endsWith("/booking")) {
      uid = user ? user.uid: '';
    } else {
      var pathArr = history.location.pathname.split( '/' );
      uid = pathArr[pathArr.length-1];
    }
    dispatch(onGetBookingData(uid));
    dispatch(onGetConfigData(uid));
  }, [dispatch]);

  const {bookings: bookingData, config: bookingConfig, bookedNumber: bookedNum} = useSelector<AppState, AppState['dashboard']>(
    ({dashboard}) => dashboard
  );

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

  const getBookingUrl = () => {
    let url = '';
    if (user) {
      url = window.location.protocol + "://" + window.location.host + "/booking/" + user.uid;
    }
    
    console.log("QRCode Url:" + url);
    return url;
  }

  const getBookingDisabled = () => {
    let flg = false;
    var now = new Date();
    var month =  ("0"+(now.getMonth()+1)).slice(-2);
    var day =  ("0"+now.getDate()).slice(-2);
    var date = now.getFullYear() + "/" + month + "/" + day
    console.log('bookingFlg:' + bookingConfig?.bookingFlg)
    console.log('flgDate:' + bookingConfig?.flgDate)
    if (bookingConfig?.bookingFlg && bookingConfig?.flgDate === date) {
      flg = true;
    }

    console.log('flg:' + flg)
    return flg;
  };

  return (
    <Box display='flex' flexDirection='column' justifyContent='flex-start' alignItems="center"> 
      <Box width='100%' display="flex" flexDirection="row" justifyContent='space-between' alignItems='baseline'>
        <Box className={classes.headerBox}></Box>
        <label htmlFor='icon-button-file'>
          <Avatar variant="square" className={classes.avatar} src={require('assets/images/byouin_logo.jpg')} />
        </label>
        <Box className={classes.headerBox}>
          { (getBookingUrl() === '') ? ( null ) : (            
              <QRCode size={90} value={getBookingUrl()} />
            ) 
          }
        </Box>
        
        {/* <Box
          mb={3}
          component='h2'
          fontFamily={Fonts.MEDIUM}
          className='font-bold'
          id='alert-dialog-title'>
          あつき動物病院
        </Box> */}
      </Box>
      <Box px={5} width='100%' borderBottom={`4px solid ${blue[500]}`}></Box>
      { (getBookingDisabled()) && (
        <Box className={classes.stopBooking}>
          <StopBooking/>
        </Box>
      )}
      <Box width='100%' display="flex" flexDirection="row" justifyContent='space-around' className={classes.statsbox} >
      <Box width='48%'>
          <BookingStats
            bgColor={red[500]}
            num={getCallingNumber()}
            heading={"お呼び出し中"}
            unit={"番"}
          />
        </Box>
        <Box width='48%'>
        <BookingStats
            bgColor={blue[500]}
            num={getWaitingCount()}
            heading={"お待ちの人数"}
            unit={"人"}
            option={getOptionString()}
          />
          </Box>
        </Box>
        <Box 
          mt={1}
          mb={4}
          width="92%" 
          color={red[500]}
          fontSize={18}
          fontFamily={Fonts.MEDIUM}>
        診察の内容によってお呼び出しの順番が前後する事があります。あらかじめご了承ください。
        </Box>
      <Box width="98%" mb={4}>
        <Card>
          <Box px={{xs: 6, sm: 10, xl: 15}}>
            <Box
              component='h2'
              mt={{xs: 3, xl: 6}}
              mb={{xs: 3, xl: 6}}
              color='text.primary'
              fontFamily={Fonts.MEDIUM}
              fontSize={{xs: 24, xl: 30}}>
              {bookingConfig ? bookingConfig.title : ''}
            </Box>
            <Box
              mb={{xs: 3, xl: 6}}
              fontFamily={Fonts.LIGHT}
              fontSize={{xs: 16, sm: 24, xl: 28}}
              >
                {bookingConfig ? bookingConfig.notes : ''}
            </Box>
          </Box>
        </Card>
      </Box>
      <Box width="98%" mt={2}>
        { (getBookingDisabled()==false && bookedNum == 0) && (
        <Card >
          <Accordion defaultExpanded>
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1c-content'
              id='panel1c-header'
              className={classes.btnPrimary}>
                <Box width='100%'
                >
                  <Typography className={classes.heading}>新規予約はこちらから</Typography>
                  </Box>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <AddBookingForm />
            </AccordionDetails>
          </Accordion>
        </Card>
        )}
        { (bookedNum != 0) && (
          <AfterBooking bookedNumber={bookedNum}></AfterBooking>
        )}
      </Box>
      <InfoView />
    </Box>
  );
};

export default Booking;
