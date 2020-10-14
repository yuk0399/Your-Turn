import { BookingData, BookingConfig } from './../../types/models/Analytics';
import {
  DashboardActionTypes,
  GET_BOOKING_DATA,
  GET_BOOKING_CONFIG,
  GET_LATEST_BOOKED_NUMBER
} from '../../types/actions/Dashboard.action';
import {Bookings} from '../../types/models/Analytics';

const initialState: {
  bookings: Bookings | null,
  config: BookingConfig | null,
  bookedNumber: number
} = {
  bookings: null,
  config: null,
  bookedNumber: 0
};

export default (state = initialState, action: DashboardActionTypes) => {
  switch (action.type) {
    case GET_BOOKING_DATA:
      return {
        ...state,
        bookings: action.payload,
      };
    case GET_BOOKING_CONFIG:
      return {
        ...state,
        config: action.payload,
      };
    case GET_LATEST_BOOKED_NUMBER:
      return {
        ...state,
        bookedNumber: action.payload,
      };
    default:
      return state;
  }
};
