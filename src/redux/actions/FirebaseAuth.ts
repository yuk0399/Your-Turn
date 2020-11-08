import { getTodayString } from 'shared/function/common';
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

export const onGetUserInfo = (uid: string = '') => {
  
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    let userId = uid;
    if (uid === '') {
      var user = firebase.auth().currentUser;
      if (user)
        userId = user.uid;
    }

    try {
      if (userId.length > 0) {
        var ref = firebase.database().ref('/users/' + userId);
        ref.on('value', function(data) {
     
          if (data.exists()) {
            const userInfo: UserInfo = {
              displayName: '',
              signinDate: ''
            }   
            data.forEach(snapshot => {
              switch (snapshot.key) {
                case 'displayName':
                  userInfo.displayName = snapshot.val();
                  break;
                case 'signinDate':
                  userInfo.signinDate = snapshot.val();
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

export const onUpdateBookingDate = () => {
  
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    var user = auth.currentUser;

    try {
      if (user) {
        var ref = firebase.database().ref('/users/' + user?.uid);
          ref.update({
            signinDate: getTodayString(),
          }).then((data) => {
            onGetUserInfo();
            dispatch(showMessage("本日の受付を有効にしました。"));
          })
          .catch((error) => {
            dispatch(fetchError(error.message));
          });
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  }
}

export const onUpdateNameAndPassword = (name: string, newPassword: string) => {
  console.log("onUpdateNameAndPassword:" + name)
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    var user = auth.currentUser;

    try {
      if (user) {
        var ref = firebase.database().ref('/users/' + user?.uid);
          ref.update({
            displayName: name,
          }).then((data) => {
            if (newPassword) {
              user?.updatePassword(newPassword).then(function() {
                dispatch(showMessage("アカウント設定を更新しました。"));
                dispatch(fetchSuccess());
              }).catch(function(error) {
                dispatch(fetchError(error.message));
              });
            }

            onGetUserInfo();

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

          
          dispatch(fetchSuccess());
          var ref = firebase.database().ref('/users/' + data.user!.uid);
          ref.set({
            displayName: name,
          }).then((data) => {
            onGetUserInfo();
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
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function() {
        auth.signInWithEmailAndPassword(email, password)
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
            // var ref = firebase.database().ref('/users/' + data.user!.uid);
            // ref.update({
            //   signinDate: getTodayString()
            // }).then((data) => {
            //   onGetUserInfo();
            //   // const userInfo: UserInfo = {
            //   //   displayName: user.displayName || '',
            //   //   signinDate: getTodayString()
            //   // }
            //   // dispatch({type: UPDATE_USER_INFO, payload: userInfo});
            // })
          })
          .catch((error) => {
            dispatch(fetchError(error.message));
          });
        })
        .catch(function(error) {
          dispatch(fetchError(error.message));    
        })
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
