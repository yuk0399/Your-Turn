import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import {Box, makeStyles} from '@material-ui/core';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import {grey} from '@material-ui/core/colors/index';
import {BookingConfig, BookingData} from '../../../../../types/models/Analytics';

interface TransactionTableProps {
  bookingList: BookingData[];
  bookingConfig: BookingConfig;
}

const TransactionTable: React.FC<TransactionTableProps> = ({bookingList, bookingConfig}) => {
  const useStyles = makeStyles(() => ({
    tableResponsiveMaterial: {
      minHeight: '.01%',
      overflowX: 'auto',

      '@media (max-width: 767px)': {
        width: '100%',
        marginBottom: 15,
        overflowY: 'hidden',
        border: `1px solid ${grey[300]}`,
        '& > table': {
          marginBottom: 0,
          '& > thead > tr > th, > tbody > tr > th, > tfoot > tr > th, thead > tr > td, tbody > tr > td, tfoot > tr > td': {
            whiteSpace: 'nowrap',
          },
        },
      },
    },
  }));
  const classes = useStyles();

  return (
    <Box className={classes.tableResponsiveMaterial}>
      <Table className='table'>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {bookingList.map((booking) => (
            <TableItem data={booking} config={bookingConfig} key={booking.orderNumber} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default TransactionTable;
