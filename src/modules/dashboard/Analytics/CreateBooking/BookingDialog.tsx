import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import BookingForm from './BookingForm'
import { Box } from '@material-ui/core';
import { BookingData } from 'types/models/Analytics';

interface BookingDialogProps {
  open: boolean;
  onCloseAction: (x: boolean) => void;
  bookingData: BookingData;
}

const BookingDialog: React.FC<BookingDialogProps> = ({
  open,
  onCloseAction,
  bookingData
}) => {
  return (
    <Dialog open={open} onClose={() => onCloseAction(false)}>
      <Box>
        <BookingForm userId={''} afterBookingAction={() => {onCloseAction(true)}} bookingData={bookingData} isEdit={true}/>
      </Box>
    </Dialog>
  )
}

export default BookingDialog;
