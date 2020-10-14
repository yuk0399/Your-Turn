import {AppActions} from '../../types';
import {UPDATE_FIREBASE_USER, UPDATE_USER_INFO} from '../../types/actions/Auth.actions';
import {AuthUser, UserInfo} from '../../types/models/AuthUser';

const INIT_STATE: {user: AuthUser | null, userInfo: UserInfo | null} = {
  user: null,
  userInfo: null,
};

export default (state = INIT_STATE, action: AppActions) => {
  switch (action.type) {
    case UPDATE_FIREBASE_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case UPDATE_USER_INFO: {
      return {
        ...state,
        userInfo: action.payload,
      };
    }
    default:
      return state;
  }
};
