export interface InfoWidgets {
  id: number;
  icon: string;
  count: number;
  suspension: number;
  details: string;
  bgColor: string;
}

export interface BookingData {
  id: string;
  orderNumber: number;
  medical_number: string;
  status: number;
  name: string;
  email: string;
  number: number;
  waiting_count: number;
  pet_name1: string;
  content1: string;
  pet_name2: string;
  content2: string;
  pet_name3: string;
  content3: string;
  pet_name4: string;
  content4: string;
  pet_name5: string;
  content5: string;
  date: string;
  time: string;
  directBooked: boolean;
  mailGuided: boolean;
}

export interface BookingConfig {
  photoUrl: string;
  open_time1: string;
  close_time1: string;
  open_time2: string;
  close_time2: string;
  title: string;
  notes: string;
  bookingFlg: boolean;
  flgDate: string;
  phone_number: string;
  mail_sign: string;
}

export interface Bookings {
  bookingList: BookingData[];
}

export interface MailContent {
  to: string;
  subject: string;
  content: string;
}
