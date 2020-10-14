import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import {onSignOutFirebaseUser} from '../../redux/actions';
import { useAuthUser } from '@crema/utility/AppHooks';

const Signout: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useAuthUser();

    useEffect(() => {
        if (user) {
            dispatch(onSignOutFirebaseUser());
          } else {
              history.push('/signin');
          }
      }, [dispatch]);

    return (
        <Box>
        </Box>
    );
}

export default Signout;