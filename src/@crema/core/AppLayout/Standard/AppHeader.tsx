import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import {toggleNavCollapsed} from '../../../../redux/actions';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import useStyles from './AppHeader.style';
import AppLogo from '../../../../shared/components/AppLogo';
import clsx from 'clsx';
import InfoWidget from 'modules/dashboard/Analytics/InfoWidget';
import {onGetBookingData} from '../../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../../../redux/store';
import { BookingData } from 'types/models/Analytics';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

interface AppHeaderProps {}

const AppHeader: React.FC<AppHeaderProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetBookingData());
  }, [dispatch]);

  const {bookings: bookingData, config: bookingConfig} = useSelector<AppState, AppState['dashboard']>(
    ({dashboard}) => dashboard
  );

  const getWaitingCount = () => {
    if (bookingData) {
      return bookingData.bookingList.filter(function (booking: BookingData) {
        return booking.status === 0;
      }).length;
    } else {
      return 0;
    }
  };

  const getSuspensionCount = () => {
    if (bookingData) {
      return bookingData.bookingList.filter(function (booking: BookingData) {
        return booking.status === 2;
      }).length;
    } else {
      return 0;
    }
  };

  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = useState<null | HTMLElement>(null);

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMobileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const getBookingStatusInfo = () => {
    let flg = false;
    var now = new Date();
    var month =  ("0"+(now.getMonth()+1)).slice(-2);
    var day =  ("0"+now.getDate()).slice(-2);
    var date = now.getFullYear() + "/" + month + "/" + day
    if (bookingConfig?.bookingFlg && bookingConfig?.flgDate === date) {
      flg = true;
    }
    if (flg)
      return temporaryCloseInfo;
    else
      return openingInfo;
  };

  const openingInfo = {
      id: 1,
      icon: require('assets/images/status_play.png'),
      count: getWaitingCount(),
      suspension: getSuspensionCount(),
      details: '予約受付中',
      bgColor: '#0698ED',
    }

    const closingInfo = {
      id: 2,
      icon: require('assets/images/status_stop.png'),
      count: getWaitingCount(),
      suspension: getSuspensionCount(),
      details: '予約停止中',
      bgColor: '#b5b0b0',
    }

    const temporaryCloseInfo = {
      id: 3,
      icon: require('assets/images/status_temp_stop.png'),
      count: getWaitingCount(),
      suspension: getSuspensionCount(),
      details: '予約一時停止中',
      bgColor: '#b5b0b0',
    }

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      open={Boolean(mobileMoreAnchorEl)}
      onClose={handleMobileMenuClose}>
    </Menu>
  );

  return (
    <>
      <AppBar color='inherit' className={clsx(classes.appBar, 'app-bar')}>
        <Toolbar className={classes.appToolbar}>
          <Hidden lgUp>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='open drawer'
              onClick={() => dispatch(toggleNavCollapsed())}>
              <MenuIcon className={classes.menuIcon} />
            </IconButton>
          </Hidden>
          <AppLogo />
          <Box className={classes.grow} />
          
          <Box >
            <InfoWidget data={getBookingStatusInfo()} />
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};
export default AppHeader;
