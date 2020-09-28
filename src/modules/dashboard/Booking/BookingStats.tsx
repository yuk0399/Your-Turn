import React from 'react';
import {Card, makeStyles} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {blue} from '@material-ui/core/colors';
import {Fonts} from 'shared/constants/AppEnums';
import { CremaTheme } from 'types/AppContextPropsType';

interface BookingStatsProps {
  bgColor: string;
  num: number;
  heading: string;
  unit: string;
}

const BookingStats: React.FC<BookingStatsProps> = ({
  bgColor,
  num,
  heading,
  unit
}) => {
  const useStyles = makeStyles((theme: CremaTheme) => ({
    statsCard: {
      borderRadius: theme.overrides.MuiCardLg.root.borderRadius,
      padding: 12,
    },
    root: {
      height: 100,
      width: 100,
      backgroundColor: bgColor,
      [theme.breakpoints.up('md')]: {
        height: 120,
        width: 120,
      },
      [theme.breakpoints.up('lg')]: {
        height: 130,
        width: 130,
      },
      [theme.breakpoints.up('xl')]: {
        height: 170,
        width: 170,
      },
    },
  }));

  const classes = useStyles();

  return (
    <Card className={classes.statsCard}>
      <Box display='flex' alignItems='center' justifyContent='center'>
        <Box position='relative' ml={{xs: 3, xl: 6}} width='100%'>
          <Box
            width="100%"
            textAlign="left"
            component='p'
            fontSize={{xs: 18, sm: 36, xl: 42}}
            color='grey.500'
            mb={1}>
            {heading}
          </Box>
          <Box display='flex' alignItems='center' justifyContent="center" flexDirection="row">
            <Box
              component='h1'
              display='inline-block'
              fontFamily={Fonts.LIGHT}
              color={bgColor}
              fontSize={{xs: 64, sm: 82, xl: 104}}>
              {num}
            </Box>
            <Box
              component='span'
              ml={3}
              fontSize={{xs: 32, xl: 72}}
              fontFamily={Fonts.MEDIUM}>
              {unit}
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default BookingStats;
