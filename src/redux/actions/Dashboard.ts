import { BookingConfig } from './../../types/models/Analytics';
import firebase, { FirebaseError } from 'firebase';
// import 'firebase/auth';
// import 'firebase/firestore';
import {fetchError, fetchStart, fetchSuccess} from './Common';
import {AppActions} from '../../types';
import {Dispatch} from 'redux';
import {showMessage} from 'redux/actions';
import {
  GET_BOOKING_DATA,
  GET_BOOKING_CONFIG,
  GET_LATEST_BOOKED_NUMBER
} from '../../types/actions/Dashboard.action';
import {
  CommonActionTypes,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  TOGGLE_APP_DRAWER,
} from '../../types/actions/Common.action';

import { Bookings, BookingData } from 'types/models/Analytics';


export const onGetConfigData = (uid: string = '') => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    let userId = uid;
    if (uid === '') {
      var user = firebase.auth().currentUser;
      if (user)
        userId = user.uid;
    }

    if (userId.length > 0) {
      var ref = firebase.database().ref('/config/' + userId);
      ref.on('value', function(data) {
          dispatch(fetchSuccess());
          if (data.exists()) {
            let config: BookingConfig = {
              photoUrl: '',
              open_time1: '',
              close_time1: '',
              open_time2: '',
              close_time2: '',
              title: '',
              notes: '',
              bookingFlg: false,
              flgDate: ''
            }
            data.forEach(snapshot => {
              switch (snapshot.key) {
                case 'photoUrl':
                  config.photoUrl = snapshot.val();
                  break;
                case 'open_time1':
                  config.open_time1 = snapshot.val();
                  break;
                case 'close_time1':
                  config.close_time1 = snapshot.val();
                  break;
                case 'open_time2':
                  config.open_time2 = snapshot.val();
                  break;
                case 'close_time2':
                  config.close_time2 = snapshot.val();
                  break;
                case 'title':
                  config.title = snapshot.val();
                  break;
                case 'notes':
                  config.notes = snapshot.val();
                  break;
                case 'bookingFlg':
                  config.bookingFlg = snapshot.val();
                  break;
                case 'flgDate':
                  config.flgDate = snapshot.val();
                  break;
                default:
                  console.log('snapshot.key default');
                  console.log(snapshot.key);
                  console.log(snapshot.val());
                  break;
              };
            })
            console.log('onGetConfigData');
            console.log(config);
            dispatch({type: GET_BOOKING_CONFIG, payload: config});    
          }
            
        }, function(error: FirebaseError) {
          dispatch(fetchError(error.message));
        }
      )
    }
  };
}

export const onUpdateBookingFlg = (flg: Boolean) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    var user = firebase.auth().currentUser;
    if (user) {
      var ref = firebase.database().ref('/config/' + user.uid);
      var now = new Date();
      var month =  ("0"+(now.getMonth()+1)).slice(-2);
      var day =  ("0"+now.getDate()).slice(-2);
      ref.update({
        bookingFlg: flg,
        flgDate: now.getFullYear() + "/" + month + "/" + day,
      }).then((data) => {
          dispatch(fetchSuccess());
          dispatch(showMessage("受付状況を更新しました。"));        
          onGetConfigData();
        })
        .catch((error) => {
          dispatch(fetchError(error.message));
        });
      }
    };
  };

export const onUpdateBookingConfig = (config: BookingConfig) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    var user = firebase.auth().currentUser;
    if (user) {
      var ref = firebase.database().ref('/config/' + user.uid);
      ref.set({
        photoUrl: config.photoUrl,
        open_time1: config.open_time1,
        close_time1: config.close_time1,
        open_time2: config.open_time2,
        close_time2: config.close_time2,
        title: config.title,
        notes: config.notes
      }).then((data) => {
        console.log('Done to update config')
        dispatch(fetchSuccess());
        dispatch(showMessage("受付設定を更新しました。"));
        onGetConfigData();
      })
      .catch((error) => {
        dispatch(fetchError(error.message));
      });
    }
  };
};

export const onGetBookingData = (uid: string = '') => {
  var first: boolean = true;
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    let userId = uid;
    if (uid === '') {
      var user = firebase.auth().currentUser;
      if (user)
        userId = user.uid;
    }

    if (userId.length > 0) {
      var ref = firebase.database().ref('/bookings/' + userId);
      ref.on('value', function(data) {
          dispatch(fetchSuccess());
          // console.log(data.val());
          var list: BookingData[] = [];
          if (data.exists()) {
            data.forEach(snapshot => {
              // console.log(snapshot.val());
              let data: BookingData = snapshot.val();
              data.id = (snapshot.key === null ? '' : snapshot.key);
              list.push(data);
            });          
          }
          var bookings: Bookings = {bookingList: list};
          dispatch({type: GET_BOOKING_DATA, payload: bookings});
          // if (!first) {
          //   dispatch(showMessage("予約が追加されました。"));
          // }
          first = false;
            
        }, function(error: FirebaseError) {
          dispatch(fetchError(error.message));
        }
      )
    }
  };
};

export const onCreateBookingData = (booking: BookingData) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    var user = firebase.auth().currentUser;
    if (user) {
      var ref = firebase.database().ref('/bookings/' + user.uid);
      // max-idの取得
      var max_id = 0;
      ref.orderByChild("orderNumber").limitToLast(1).on("value", function(snapshot) { 
        snapshot.forEach(function(data) {
          let latestBook: BookingData = data.val();
          max_id = latestBook.orderNumber;
        });
      }, function(error: FirebaseError) {
        dispatch(fetchError(error.message));
      });
      
      // 診察番号の発行
      booking.orderNumber = max_id + 1;
      
      ref.push(booking).then((data) => {
          dispatch(fetchSuccess());
          console.log("Booked Order Number in onCreateBookinData:" + booking.orderNumber)
          dispatch({type: GET_LATEST_BOOKED_NUMBER, payload: booking.orderNumber});
          dispatch(showMessage("予約を追加しました。"));
        })
        .catch((error) => {
          dispatch(fetchError(error.message));
        });
    }
  };
};

export const onUpdateSelectedBooking = (bookingId: string, status: number) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    var user = firebase.auth().currentUser;
    if (user) {
      var ref = firebase.database().ref('/bookings/' + user.uid + "/" + bookingId);
      ref.update({
        status: status
      }).then((data) => {
          dispatch(fetchSuccess());
          dispatch(showMessage("ステータスを更新しました。"));        
          onGetBookingData();
        })
        .catch((error) => {
          dispatch(fetchError(error.message));
        });
    }
  };
};

export const onDeleteSelectedBooking = (bookingId: string) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    var user = firebase.auth().currentUser;
    if (user) {
      var ref = firebase.database().ref('/bookings/' + user.uid + "/" + bookingId);
      ref.remove().then((data) => {
          dispatch(fetchSuccess());
          dispatch(showMessage("予約を削除しました。"));
          onGetBookingData();
        })
        .catch((error) => {
          dispatch(fetchError(error.message));
        });
    }
  };
};
