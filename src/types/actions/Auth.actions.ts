import {AuthUser, UserInfo} from '../models/AuthUser';

export const UPDATE_FIREBASE_USER = 'UPDATE_FIREBASE_USER';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';

export interface UpdateAuthUserActions {
  type: typeof UPDATE_FIREBASE_USER;
  payload: AuthUser | null;
}

export interface UpdateUserInfoActions {
  type: typeof UPDATE_USER_INFO;
  payload: UserInfo | null;
}

export type AuthActions = UpdateAuthUserActions;
