export interface AuthUser {
  uid: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  token?: string;
}

export interface UserInfo {
  displayName: string;
}

export interface UserData {
  authUser?: AuthUser;
  userInfo?: UserInfo;
}