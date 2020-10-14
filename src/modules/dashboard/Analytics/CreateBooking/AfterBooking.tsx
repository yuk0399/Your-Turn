import React from 'react';
import {useHistory} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {CremaTheme} from '../../../../types/AppContextPropsType';
import BookingStats from 'modules/dashboard/Booking/BookingStats';
import {orange} from '@material-ui/core/colors';

interface AfterBookingProps {
    bookedNumber: number;
}

const AfterBooking: React.FC<AfterBookingProps> = ({
    bookedNumber
}) => {
  const useStyles = makeStyles((theme: CremaTheme) => {
    return {
      button: {
        fontFamily: Fonts.LIGHT,
        fontSize: 16,
        textTransform: 'capitalize',
        padding: '12px 32px',
        [theme.breakpoints.up('xl')]: {
          fontSize: 20,
        },
      },
      image: {
        width: '100%',
      },
    };
  });

  const classes = useStyles();

  return (
    <>
      <Box
        py={{xl: 8}}
        flex={1}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        textAlign='center'>
        <Box
          mb={{xs: 4, xl: 8}}
          width='100%'
          maxWidth={{xs: 250, sm: 400, xl: 706}}>
          <BookingStats
            bgColor={orange[500]}
            num={bookedNumber}
            heading={"受付番号"}
            unit={"番"}
          />
        </Box>
        <Box mb={{xs: 4, xl: 5}}>
          <Box
            component='h3'
            mb={{xs: 3, xl: 10}}
            fontSize={{xs: 24, md: 28}}
            fontFamily={Fonts.LIGHT}>
            診察予約が完了しました。
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AfterBooking;
