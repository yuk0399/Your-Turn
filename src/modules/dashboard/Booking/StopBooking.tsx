import React from 'react';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import { Fonts } from 'shared/constants/AppEnums';
import { grey } from '@material-ui/core/colors';
import { CremaTheme } from 'types/AppContextPropsType';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: CremaTheme) => ({
    stop: {
      backgroundColor: grey[400],
    }
}));

const StopBooking = () => {   
    const classes = useStyles();
    return (
      <Box>
        <Card className={classes.stop}>
        <Box
            px={{xs: 6, sm: 10, xl: 15}}
            component='h2'
            mt={{xs: 3, xl: 6}}
            mb={{xs: 3, xl: 6}}
            color={grey[900]}
            fontFamily={Fonts.MEDIUM}
            fontSize={{xs: 24, xl: 30}}>
              現在受付時間外です。
            </Box>
        </Card>
      </Box>
  );
};

export default StopBooking;
