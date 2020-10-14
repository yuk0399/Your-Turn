import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import TransactionTable from './TransactionTable';
import {useIntl} from 'react-intl';
import {Bookings} from '../../../../types/models/Analytics';

interface Props {
  bookingData: Bookings;
}

const OrderNTransaction: React.FC<Props> = ({bookingData}) => {
  const {messages} = useIntl();
  return (
    <AppCard
      >
      <TransactionTable bookingList={bookingData.bookingList} />
    </AppCard>
  );
};

export default OrderNTransaction;
