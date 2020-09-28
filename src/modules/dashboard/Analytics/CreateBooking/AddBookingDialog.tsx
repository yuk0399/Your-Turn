import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import AddBookingForm from './AddBookingForm'
import { Box } from '@material-ui/core';

interface AddBookingDialogProps {
  open: boolean;
  onCloseAction: (x: boolean) => void;
  onAddAction: () => void;
}

const AddBookingDialog: React.FC<AddBookingDialogProps> = ({
  open,
  onCloseAction,
  onAddAction,
}) => {
  return (
    <Dialog open={open} onClose={() => onCloseAction(false)}>
      <Box width="60%" minWidth="500px">
        <AddBookingForm/>
      </Box>
    </Dialog>
  )
}

export default AddBookingDialog;
