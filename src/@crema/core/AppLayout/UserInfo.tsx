import React, {useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import {useDispatch} from 'react-redux';
import {onSignOutFirebaseUser} from '../../../redux/actions';
import {useAuthUser} from '../../utility/AppHooks';
import AppContext from '../../utility/AppContext';
import {makeStyles} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import {orange} from '@material-ui/core/colors';
import AppContextPropsType, {
  CremaTheme,
} from '../../../types/AppContextPropsType';

interface UserInfoProps {
  props?: any;
}

const UserInfo: React.FC<UserInfoProps> = (props) => {
  const {themeMode} = useContext<AppContextPropsType>(AppContext);
  const user = useAuthUser();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUserAvatar = () => {
    if (user && user.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user && user.email) {
      return user.email.charAt(0).toUpperCase();
    }
  };
  const useStyles = makeStyles((theme: CremaTheme) => {
    return {
      avatar: {
        height: 40,
        width: 40,
        fontSize: 24,
        backgroundColor: orange[500],
        [theme.breakpoints.up('xl')]: {
          height: 55,
          width: 55,
        },
      },
      userInfo: {
        width: 'calc(100% - 75px)',
      },
      userName: {
        color: themeMode === 'light' ? '#313541' : 'white',
      },
      pointer: {
        cursor: 'pointer',
      },
    };
  });

  const classes = useStyles(props);

  return (
    <Box py={2} pl={{xs: 2, sm: 6}}>
      <Box className={classes.pointer} onClick={handleClick}>
        {user && user.photoURL ? (
          <Avatar className={classes.avatar} src={user.photoURL} />
        ) : (
          <Avatar className={classes.avatar}>{getUserAvatar()}</Avatar>
        )}
      </Box>
    </Box>
  );
};

export default UserInfo;
