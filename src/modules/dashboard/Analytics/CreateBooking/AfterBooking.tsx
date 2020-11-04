import React from 'react';
import {useHistory} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import {Button, makeStyles} from '@material-ui/core';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {CremaTheme} from '../../../../types/AppContextPropsType';
import BookingStats from 'modules/dashboard/Booking/BookingStats';
import {orange} from '@material-ui/core/colors';

interface AfterBookingProps {
    bookedNumber: number;
    isVisibleNextButton: boolean;
    clickNextButton: () => void;
}

const AfterBooking: React.FC<AfterBookingProps> = ({
    bookedNumber,
    isVisibleNextButton,
    clickNextButton
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
      btnRoot: {
        borderRadius: theme.overrides.MuiCard.root.borderRadius,
        width: '10rem',
        // margin: '1rem',
        fontFamily: Fonts.LIGHT,
        fontSize: 16,
        textTransform: 'capitalize',
        [theme.breakpoints.up('sm')]: {
          fontSize: 18,
        },
        [theme.breakpoints.up('xl')]: {
          fontSize: 20,
        },
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
            予約受付が完了しました。ご来院をお待ちしています。
          </Box>
        </Box>
        { (isVisibleNextButton) && (
          <Box
          mb={6}
          display='flex'
          flexDirection={{xs: 'column', sm: 'row'}}
          alignItems={{sm: 'center'}}
          justifyContent={{sm: 'space-between'}}>
          <Button
            variant='contained'
            color='primary'
            className={classes.btnRoot}
            onClick={() => clickNextButton()}
            >
            続けて追加する
          </Button>
        </Box>
        )}
      </Box>
    </>
  );
};

export default AfterBooking;
