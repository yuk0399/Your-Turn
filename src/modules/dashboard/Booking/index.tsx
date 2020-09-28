import React, {useEffect} from 'react';
import AddBookingForm from '../Analytics/CreateBooking/AddBookingForm';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from 'shared/constants/AppEnums';
import { CremaTheme } from 'types/AppContextPropsType';
import BookingStats from './BookingStats';
import {blue, red} from '@material-ui/core/colors';
import { Avatar } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme: CremaTheme) => ({
  avatar: {
    width: 140,
    height: 70,
    marginRight: 8,
  },
  statsbox: {
    marginTop: 8,
    marginBottom: 8,
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  btnPrimary: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontFamily: Fonts.LIGHT,
    fontSize: 16,
    lineHeight: '16px',
    [theme.breakpoints.up('sm')]: {
      lineHeight: '20px',
    },
    [theme.breakpoints.up('xl')]: {
      lineHeight: '26px',
    },
  },
}));

const Booking = () => {
  const [userImageURL, setUserImageURL] = React.useState('');
  const classes = useStyles();

  return (
    <Box display='flex' flexDirection='column' justifyContent='flex-start' alignItems="center"> 
      <Box display="flex" flexDirection="row" alignItems='baseline'>
        <label htmlFor='icon-button-file'>
          <Avatar variant="square" className={classes.avatar} src={userImageURL} />
        </label>
        <Box
          mb={3}
          component='h2'
          fontFamily={Fonts.MEDIUM}
          className='font-bold'
          id='alert-dialog-title'>
          あつき動物病院
        </Box>
      </Box>
      <Box px={5} width='100%' borderBottom={`4px solid ${blue[500]}`}></Box>
      <Box width='100%' display="flex" flexDirection="row" justifyContent='space-around' className={classes.statsbox} >
      <Box width='48%'>
          <BookingStats
            bgColor={red[500]}
            num={4}
            heading={"お呼び出し中"}
            unit={"番"}
          />
        </Box>
        <Box width='48%'>
        <BookingStats
            bgColor={blue[500]}
            num={8}
            heading={"お待ちの人数"}
            unit={"人"}
          />
          </Box>
        </Box>
      <Box width="98%" >
        <Card>
          <Box px={{xs: 6, sm: 10, xl: 15}}>
            <Box
              component='h2'
              mt={{xs: 3, xl: 6}}
              mb={{xs: 3, xl: 6}}
              color='text.primary'
              fontFamily={Fonts.MEDIUM}
              fontSize={{xs: 24, xl: 30}}>
              当院からのお知らせ
            </Box>
            <Box
              mb={{xs: 3, xl: 6}}
              fontFamily={Fonts.LIGHT}
              fontSize={{xs: 16, sm: 24, xl: 28}}
              >
              インフルエンザが流行しています。<br/>
              うがい手洗いで予防を心がけてください。
            </Box>
          </Box>
        </Card>
      </Box>
      <Box width="98%" mt={2}>
        <Card >
          <Accordion>
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1c-content'
              id='panel1c-header'
              className={classes.btnPrimary}>
                <Box width='100%'
                >
                  <Typography className={classes.heading}>新規予約はこちらから</Typography>
                  </Box>
              
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <AddBookingForm/>
            </AccordionDetails>
          </Accordion>
        </Card>
      </Box>
    </Box>
  );
};

export default Booking;
