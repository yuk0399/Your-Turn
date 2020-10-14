import {auth} from '../../@crema/services/auth/firebase/firebase';
import {Dispatch} from 'redux';
import {AppActions} from '../../types';
import {fetchError, fetchStart, fetchSuccess} from './Common';
import {showMessage} from '../actions';
import {AuthUser, UserInfo} from '../../types/models/AuthUser';
import {
  UPDATE_FIREBASE_USER,
  UPDATE_USER_INFO,
  UpdateAuthUserActions,
  UpdateUserInfoActions
} from '../../types/actions/Auth.actions';
import firebase, { FirebaseError } from 'firebase';


export const onGetUserInfo = () => {
  console.log("onGetUserInfo")
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    var user = auth.currentUser;

    try {
      if (user) {
        var ref = firebase.database().ref('/users/' + user?.uid);
        ref.on('value', function(data) {
     
          if (data.exists()) {
            const userInfo: UserInfo = {
              displayName: ''
            }   
            data.forEach(snapshot => {
              switch (snapshot.key) {
                case 'displayName':
                  userInfo.displayName = snapshot.val();
                  break;
                default:
                  console.log('snapshot.key default');
                  console.log(snapshot.key);
                  console.log(snapshot.val());
                  break;
              };
            })
            console.log(userInfo)
            dispatch({type: UPDATE_USER_INFO, payload: userInfo});
            dispatch(fetchSuccess());
          }
        }, function(error: FirebaseError) {
          dispatch(fetchError(error.message));
        })
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
};
}

export const onUpdateNameAndPassword = (name: string, newPassword: string) => {
  console.log("onUpdateNameAndPassword:" + name)
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    var user = auth.currentUser;

    try {
      if (user) {
        var ref = firebase.database().ref('/users/' + user?.uid);
          ref.set({
            displayName: name,
            email: user?.email,
          }).then((data) => {
            if (newPassword) {
              user?.updatePassword(newPassword).then(function() {
                dispatch(showMessage("アカウント設定を更新しました。"));
                dispatch(fetchSuccess());
              }).catch(function(error) {
                dispatch(fetchError(error.message));
              });
            }
            const userInfo: UserInfo = {
              displayName: name || '',
            }
            dispatch({type: UPDATE_USER_INFO, payload: userInfo});
            if (newPassword === '') {
              dispatch(showMessage("アカウント設定を更新しました。"));
              dispatch(fetchSuccess());
            }
          } 
          )
          .catch((error) => {
            dispatch(fetchError(error.message));
          });
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
};
}



export const onSignUpFirebaseUser = ({
  email,
  password,
  name
}: {
  email: string;
  password: string;
  name: string;
}) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((data) => {
          const authUser: AuthUser = {
            uid: data.user!.uid,
            displayName: name || '',
            email: data.user!.email || '',
            photoURL: data.user!.photoURL || '',
            token: data.user!.refreshToken,
          };
          dispatch({type: UPDATE_FIREBASE_USER, payload: authUser});

          var ref = firebase.database().ref('/users/' + data.user!.uid);
          ref.set({
            displayName: name,
          }).then((data) => {
            const userInfo: UserInfo = {
              displayName: authUser.displayName || '',
            }
            
            dispatch({type: UPDATE_USER_INFO, payload: userInfo});
            dispatch(fetchSuccess());
          })
          .catch((error) => {
            dispatch(fetchError(error.message));
          });
        })
        .catch((error) => {
          dispatch(fetchError(error.message));
        });
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};

export const onForgetPasswordFirebaseUser = (email: string) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          dispatch(fetchSuccess());
          // dispatch({type: UPDATE_FIREBASE_USER, payload: data});
        })
        .catch((error) => {
          dispatch(fetchError(error.message));
        });
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};

/*export const onGetFirebaseSignInUser = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      auth
        .onAuthStateChanged()
        .then((authUser) => {
          dispatch(fetchSuccess());
          const userInfo = {
            uid: authUser.uid,
            displayName: authUser.displayName,
            email: authUser.email,
            photoURL: authUser.photoURL,
            token: authUser.refreshToken
          };
          dispatch({
            type: UPDATE_FIREBASE_USER,
            payload: userInfo
          });

        })
        .catch((error) => {
          dispatch(fetchError(error.message));
        });
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};*/

export const onSignInFirebaseUser = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((data) => {
          dispatch(fetchSuccess());
          const user: AuthUser = {
            uid: data.user!.uid,
            displayName: data.user!.displayName || '',
            email: data.user!.email || '',
            photoURL: data.user!.photoURL || '',
            token: data.user!.refreshToken,
          };
          
          dispatch({type: UPDATE_FIREBASE_USER, payload: user});
          onGetUserInfo();
        })
        .catch((error) => {
          dispatch(fetchError(error.message));
        });
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};

export const onSignOutFirebaseUser = () => {
  return (dispatch: Dispatch<AppActions>) => {
    console.log('onSignOutFirebaseUser');
    // dispatch(fetchStart());
    try {
      auth
        .signOut()
        .then(() => {
          dispatch(fetchSuccess());
          dispatch({type: UPDATE_FIREBASE_USER, payload: null});
        })
        .catch((error) => {
          dispatch(fetchError(error.message));
        });
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};

export const setCurrentUser = (
  user: AuthUser | null,
): UpdateAuthUserActions => ({
  type: UPDATE_FIREBASE_USER,
  payload: user,
});
