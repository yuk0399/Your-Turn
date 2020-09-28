import firebase from 'firebase';
// import 'firebase/auth';
// import 'firebase/firestore';
import {fetchError, fetchStart, fetchSuccess} from './Common';
import {AppActions} from '../../types';
import {Dispatch} from 'redux';
import {showMessage} from 'redux/actions';
import {
  GET_BOOKING_DATA,
  GET_ANALYTICS_DATA,
  GET_CRM_DATA,
  GET_CRYPTO_DATA,
  GET_METRICS_DATA,
  GET_WIDGETS_DATA,
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

export const onGetBookingData = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    var user = firebase.auth().currentUser;
    if (user) {
      var ref = firebase.database().ref('/bookings/' + user.uid);
//       var query = firebase.database().ref('/bookings/' + user.uid).orderByKey();
// query.on("value", function(snapshot) {
//   snapshot.forEach(function(childSnapshot) {
//     // key will be "ada" the first time and "alan" the second time
//     var key = childSnapshot.key;
//     // childData will be the actual contents of the child
//     var childData = childSnapshot.val();
//   });
// }, function(error) {
//   console.error(error);
// });

      ref.once("value").then((data) => {
          dispatch(fetchSuccess());
          console.log(data.val());
          var list: BookingData[] = [];
          if (data.exists()) {
            data.forEach(snapshot => {
              console.log(snapshot.val());
              list.push(snapshot.val());
            });          
          }
          var bookings: Bookings = {bookingList: list};
          dispatch({type: GET_BOOKING_DATA, payload: bookings});
        })
        .catch((error) => {
          dispatch(fetchError(error.message));
        });
    }
  };
};

export const onCreateBookingData = (booking: BookingData) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    var user = firebase.auth().currentUser;
    if (user) {
      var ref = firebase.database().ref('/bookings/' + user.uid);
      ref.push(booking).then((data) => {
          dispatch(fetchSuccess());
          dispatch(showMessage("予約を追加しました。"));
        })
        .catch((error) => {
          dispatch(fetchError(error.message));
        });
    }
  };
};

export const onUpdateSelectedBooking = (bookingId: number, status: number) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    var user = firebase.auth().currentUser;
    if (user) {
      var ref = firebase.database().ref('/bookings/' + user.uid);
      ref.set(bookingId).then((data) => {
          dispatch(fetchSuccess());
          dispatch(showMessage("予約を追加しました。"));        
          onGetBookingData();
        })
        .catch((error) => {
          dispatch(fetchError(error.message));
        });
    }
  };
};
