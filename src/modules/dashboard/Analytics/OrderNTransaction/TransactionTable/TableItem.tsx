import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import {BookingData} from '../../../../../types/models/Analytics';
import {makeStyles, Button} from '@material-ui/core';
import {CremaTheme} from '../../../../../types/AppContextPropsType';
import IntlMessages from '@crema/utility/IntlMessages';
import { Fonts } from 'shared/constants/AppEnums';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

interface Props {
  data: BookingData;
}

const useStyles = makeStyles((theme: CremaTheme) => ({
  tableCell: {
    fontSize: 16,
    padding: '12px 8px',
    '&:first-child': {
      [theme.breakpoints.up('xl')]: {
        paddingLeft: 4,
      },
    },
    '&:last-child': {
      [theme.breakpoints.up('xl')]: {
        paddingRight: 4,
      },
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 18,
      padding: 16,
    },
  },
  anchar: {
    color: theme.palette.primary.main,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    display: 'inline-block',
  },
  badgeRoot: {
    padding: '3px 10px',
    borderRadius: 4,
    display: 'inline-block',
  },
  colorBtn: {
    fontFamily: Fonts.LIGHT,
    fontSize: 14,
    marginRight: 16,
  },
  outlineBtn: {
    fontFamily: Fonts.LIGHT,
    fontSize: 14,
    border: '1px solid',
    borderColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.contrastText,
  },
}));

const TableItem: React.FC<Props> = ({data}) => {
  const classes = useStyles();
  const getPaymentTypeColor = () => {
        return '#E2A72E';    
  };
  const getPaymentStatusColor = () => {
    switch (data.status) {
      case 1: {
        return '#F84E4E';
      }
      case 0: {
        return '#43C888';
      }
      default: {
        return '#E2A72E';
      }
    }
  };

  return (
    <TableRow key={data.orderNumber}>
      <TableCell
        align='left'
        className={classes.tableCell}
        style={{color: getPaymentTypeColor()}}>
        {data.orderNumber}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        <Box
          className={classes.badgeRoot}
          style={{
            color: getPaymentStatusColor(),
            backgroundColor: getPaymentStatusColor() + '44',
          }}>
          {data.status === 1 ? "診察中" : "順番待ち"}
        </Box>
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {data.name}
        <br/>
        {data.medical_number === "" ? "初診" : data.medical_number}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {data.number}頭<br/>
        {data.content}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {data.time}
      </TableCell>
      <TableCell align='right' className={classes.tableCell}>
      
      <Box pt={3} mt={'auto'} display='flex' alignItems='center'>
            <Button
              variant='contained'
              color='primary'
              className={classes.colorBtn}>
              診察
            </Button>
            <Button
              variant='contained'
              color='secondary'
              className={classes.colorBtn}>
              完了
            </Button>
            <Button
              variant='contained'
              className={classes.colorBtn}>
                <DeleteIcon/>
            </Button>
          </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
