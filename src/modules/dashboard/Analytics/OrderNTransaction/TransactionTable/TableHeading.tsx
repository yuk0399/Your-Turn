import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {makeStyles} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';
import {Fonts} from '../../../../../shared/constants/AppEnums';
import {CremaTheme} from '../../../../../types/AppContextPropsType';

interface Props {
  props?: any;
}

const TableHeading: React.FC<Props> = (props) => {
  const useStyles = makeStyles((theme: CremaTheme) => ({
    tableRowRoot: {
      // color: grey[500],
    },
    tableCellRoot: {
      borderBottom: '1px solid #e0e0e0',
      fontSize: 14,
      padding: 6,
      fontFamily: Fonts.BOLD,
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
      [theme.breakpoints.up('lg')]: {
        fontSize: 16,
        padding: 8,
      },
    },
  }));

  const classes = useStyles(props);
  return (
    <TableRow className={classes.tableRowRoot}>
      <TableCell align='left' className={classes.tableCellRoot}>
        受付順
      </TableCell>
      <TableCell align='left' className={classes.tableCellRoot}>
        ステータス
      </TableCell>
      <TableCell align='left' className={classes.tableCellRoot}>
        飼い主様
      </TableCell>
      <TableCell align='left' className={classes.tableCellRoot}>
        ペット
      </TableCell>
      <TableCell align='left' className={classes.tableCellRoot}>
        時刻
      </TableCell>
      <TableCell align='left' className={classes.tableCellRoot}>
        操作
      </TableCell>
    </TableRow>
  );
};

export default TableHeading;
