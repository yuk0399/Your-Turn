import React, {useContext, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import {useDispatch} from 'react-redux';
import {onSignOutFirebaseUser, onGetUserInfo} from '../../../redux/actions';
import {useAuthUserAndInfo} from '../../../@crema/utility/AppHooks';
import AppContext from '../../../@crema/utility/AppContext';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import {grey, orange} from '@material-ui/core/colors';
import {Fonts} from '../../constants/AppEnums';
import AppContextPropsType, {
  CremaTheme,
} from '../../../types/AppContextPropsType';
import InfoView from '@crema/core/InfoView';

const UserInfo = (props: any) => {
  const {themeMode} = useContext<AppContextPropsType>(AppContext);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetUserInfo());
  }, [dispatch]);

  const userData = useAuthUserAndInfo();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUserAvatar = () => {
    if (userData && userData.userInfo?.displayName) {
      return userData.userInfo?.displayName.charAt(0).toUpperCase();
    }
    if (userData && userData.authUser && userData.authUser?.email) {
      return userData.authUser?.email.charAt(0).toUpperCase();
    }
  };

  const useStyles = makeStyles((theme: CremaTheme) => {
    return {
      crUserInfo: {
        backgroundColor: 'rgba(0,0,0,.08)',
        paddingTop: 9,
        paddingBottom: 9,
        minHeight: 56,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        [theme.breakpoints.up('sm')]: {
          paddingTop: 10,
          paddingBottom: 10,
          minHeight: 70,
        },
      },
      profilePic: {
        height: 40,
        width: 40,
        fontSize: 24,
        backgroundColor: orange[500],
        [theme.breakpoints.up('xl')]: {
          height: 45,
          width: 45,
        },
      },
      userInfo: {
        width: 'calc(100% - 75px)',
      },
      userName: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontSize: 18,
        fontFamily: Fonts.MEDIUM,
        [theme.breakpoints.up('xl')]: {
          fontSize: 20,
        },
        color: themeMode === 'light' ? '#313541' : 'white',
      },
      designation: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      pointer: {
        cursor: 'pointer',
      },
      adminRoot: {
        color: grey[500],
        fontSize: 16,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    };
  });

  const classes = useStyles(props);

  return (
    <Box
      px={{xs: 4, xl: 7}}
      className={clsx(classes.crUserInfo, 'cr-user-info')}>
      <Box display='flex' alignItems='center'>
        {/* {user && user.photoURL ? ( */}
          <Avatar className={classes.profilePic} src={require('assets/images/byouin_logo_small.png')} />
        {/* ) : ( */}
          {/* <Avatar className={classes.profilePic}>{getUserAvatar()}</Avatar> */}
        {/* )} */}
        <Box ml={4} className={clsx(classes.userInfo, 'user-info')}>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'>
            <Box mb={0} className={clsx(classes.userName)}>
              {userData && userData.userInfo && (userData.userInfo.displayName ? userData.userInfo.displayName : '')}
            </Box>
          </Box>
        </Box>
      </Box>
      <InfoView />
    </Box>
  );
};

export default UserInfo;
