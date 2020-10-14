import { BookingData, BookingConfig } from './../models/Analytics';
import {Bookings} from '../models/Analytics';

export const GET_BOOKING_DATA = 'GET_BOOKING_DATA';
export const GET_BOOKING_CONFIG = 'GET_BOOKING_CONFIG';
export const GET_LATEST_BOOKED_NUMBER = 'GET_LATEST_BOOKED_NUMBER';
export const CREATE_BOOKING_DATA = 'CREATE_BOOKING_DATA';

export interface GetBookingAction {
  type: typeof GET_BOOKING_DATA;
  payload: Bookings;
}

export interface GetBookingConfigAction {
  type: typeof GET_BOOKING_CONFIG;
  payload: BookingConfig;
}

export interface GetBookedNumberAction {
  type: typeof GET_LATEST_BOOKED_NUMBER;
  payload: number;
}

export interface CreateBookingAction {
  type: typeof CREATE_BOOKING_DATA;
  payload: BookingData;
}

export type DashboardActionTypes =
  | GetBookingAction
  | GetBookingConfigAction
  | GetBookedNumberAction
  | CreateBookingAction;
