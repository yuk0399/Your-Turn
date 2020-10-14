import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import {BookingData} from '../../../../../types/models/Analytics';
import {makeStyles, Button} from '@material-ui/core';
import {CremaTheme} from '../../../../../types/AppContextPropsType';
import { Fonts } from 'shared/constants/AppEnums';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import { onUpdateSelectedBooking, onDeleteSelectedBooking } from '../../../../../redux/actions';
import {useDispatch} from 'react-redux';
import ConfirmationDialog from '@crema/core/ConfirmationDialog';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import Tooltip from '@material-ui/core/Tooltip';

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
  badgeRoot: {
    padding: '3px 10px',
    borderRadius: 4,
    display: 'inline-block',
  },
  colorBtn: {
    fontFamily: Fonts.LIGHT,
    fontSize: 14,
    marginRight: 6,
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
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const getPaymentTypeColor = () => {
        return '#E2A72E';    
  };
  const getPaymentStatusColor = () => {
    switch (data.status) {
      case 3: {
        return '#4e95f8';
      }
      case 2: {
        return '#f8bf4e';
      }
      case 1: {
        return '#F84E4E';
      }
      case 0: {
        return '#31c47d';
      }
      default: {
        return '#E2A72E';
      }
    }
  };
  const getStatusString = () => {
    switch (data.status) {
      case 0: {
        return '順番待ち';
      }
      case 1: {
        return '診察中';
      }
      case 2: {
        return '保留';
      }
      default: {
        return '完了';
      }
    }
  }

  const onUpdateStatus = (status: number) => {
    dispatch(onUpdateSelectedBooking(data.id, status));
  };

  const onDeleteBooking= () => {
    setDeleteDialogOpen(false)
    dispatch(onDeleteSelectedBooking(data.id));
  }

  return (
    <TableRow key={data.orderNumber}>
      <TableCell
        align='center'
        className={classes.tableCell}
        style={{color: getPaymentTypeColor()}}>
        {data.orderNumber}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        <Box display='flex' flexDirection='row' >
          <Box
            className={classes.badgeRoot}
            style={{
              color: getPaymentStatusColor(),
              backgroundColor: getPaymentStatusColor() + '33',
            }}>
            {getStatusString()}
          </Box>
          { data.directBooked ? (
          <Box ml={0}>
            <Tooltip title='病院側で直接予約されました。'>
              <BookmarkBorderOutlinedIcon color="primary"/>
            </Tooltip>
          </Box>
          ) : (null) }
        </Box>
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {data.name}
        <br/>
        {data.medical_number ? data.medical_number : "初診"}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {data.pet_name1}:{data.content1}
        { (data.number > 1) ? (<Box>{data.pet_name2}:{data.content2}</Box>) : (null)}
        { (data.number > 2) ? (<Box>{data.pet_name3}:{data.content3}</Box>) : (null)}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {data.time}
      </TableCell>
      <TableCell align='right' className={classes.tableCell}>
      
      <Box pt={3} mt={'auto'} display='flex' alignItems='center'>
      { (data.status === 1) ? (
          <Button
            variant='contained'
            color='secondary'
            className={classes.colorBtn}
            onClick={() => onUpdateStatus(3)}>
            完了
          </Button> 
          ) : ( null ) }
        { (data.status === 0) ? (
          <Box>
          <Button
            variant='contained'
            color='primary'
            className={classes.colorBtn}
            onClick={() => onUpdateStatus(1)}
            >
            診察
          </Button>
          <Button
            variant='contained'
            color='default'
            className={classes.colorBtn}
            onClick={() => onUpdateStatus(2)}>
            保留
          </Button>
          </Box>
        ) : (
          <Button
            variant='contained'
            color='inherit'
            className={classes.colorBtn}
            onClick={() => onUpdateStatus(0)}
            >
            再開
          </Button>
        )}
          
            <Button
              variant='contained'
              className={classes.colorBtn}
              onClick={() => setDeleteDialogOpen(true)}>
                <DeleteIcon/>
            </Button>
          </Box>
      </TableCell>
      {isDeleteDialogOpen ? (
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onDeny={ () => setDeleteDialogOpen(false)}
        onConfirm={ () => onDeleteBooking() }
        title='予約を削除します。よろしいですか？'
        dialogTitle='予約の削除'
      />
    ) : null}
    </TableRow>
  );
};

export default TableItem;
