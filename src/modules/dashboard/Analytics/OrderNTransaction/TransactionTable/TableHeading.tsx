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
      color: grey[500],
    },
    tableCellRoot: {
      borderBottom: '0 none',
      fontSize: 16,
      padding: 8,
      fontFamily: Fonts.LIGHT,
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
  }));

  const classes = useStyles(props);
  return (
    <TableRow className={classes.tableRowRoot}>
      <TableCell className={classes.tableCellRoot}>受付番号</TableCell>
      <TableCell align='left' className={classes.tableCellRoot}>
        ステータス
      </TableCell>
      <TableCell align='left' className={classes.tableCellRoot}>
        お名前・診察番号
      </TableCell>
      <TableCell align='left' className={classes.tableCellRoot}>
        受診頭数・内容
      </TableCell>
      <TableCell align='left' className={classes.tableCellRoot}>
        受付時刻
      </TableCell>
      <TableCell align='left' className={classes.tableCellRoot}>
        操作
      </TableCell>
    </TableRow>
  );
};

export default TableHeading;
