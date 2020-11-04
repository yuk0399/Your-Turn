import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import TransactionTable from './TransactionTable';
import {useIntl} from 'react-intl';
import {Bookings, BookingConfig} from '../../../../types/models/Analytics';

interface Props {
  bookingData: Bookings;
  bookingConfig: BookingConfig;
}

const OrderNTransaction: React.FC<Props> = ({bookingData, bookingConfig}) => {
  const {messages} = useIntl();
  return (
    <AppCard
      >
      <TransactionTable bookingList={bookingData.bookingList} bookingConfig={bookingConfig} />
    </AppCard>
  );
};

export default OrderNTransaction;
