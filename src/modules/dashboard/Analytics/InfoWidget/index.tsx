import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import {Box} from '@material-ui/core';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {InfoWidgets} from '../../../../types/models/Analytics';

interface Props {
  data: InfoWidgets;
}

const InfoWidget: React.FC<Props> = ({data}) => {
  return (
    <AppCard className="header-info-widget-box" style={{backgroundColor: data.bgColor}}>
      
          <Box display='flex' flexDirection='column' alignItems='center'>
          <Box
            color='white'
            component='h3'           
            fontFamily={Fonts.LIGHT}
            fontSize={{xs: 16, sm: 18, xl: 20}}>
            {data.count}件順番待ち
          </Box>
          <Box display='flex' flexDirection='row'>
              <img src={data.icon} alt='icon' style={{height: 20, width: 'auto'}} />
            
              <Box color='white'>{data.details}</Box>
            </Box>
          </Box>
      
    </AppCard>
  );
};

export default InfoWidget;
