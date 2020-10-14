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
          <Box display='flex' flexDirection='row' alignItems='center'>
          <Box
            color='white'
            component='h3'           
            fontFamily={Fonts.LIGHT}
            fontSize={{xs: 16, sm: 18, xl: 20}}>
            {data.count}人順番待ち
          </Box>
          {data.suspension > 0 ? (
          <Box
            color='white'
            component='h4'           
            fontFamily={Fonts.LIGHT}
            fontSize={{xs: 12, sm: 14, xl: 16}}>
            ({data.suspension}人保留)
          </Box>
          ) : (null)
          }
          </Box>
          <Box display='flex' flexDirection='row'>
              <img src={data.icon} alt='icon' style={{height: 16, width: 'auto'}} />
            
              <Box color='white'>{data.details}</Box>
            </Box>
          </Box>
      
    </AppCard>
  );
};

export default InfoWidget;
