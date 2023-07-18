import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AbsenceDelayCard from './AbsenceDelayCard';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export default function AbsenceDelayGrid(props) {

  const data = props.data;

  return (
    <div className='AbsenceDelayGrid'>
        <Box>
            <Grid 
            className='AbsenceDelayGridContent'
            container 
            direction="column" 
            spacing={4}>
                {(data.length > 0) ? data.map((absenceDelay)=>(
                  <Grid item key={absenceDelay.id} style={{height:200}}>
                    <AbsenceDelayCard infos={absenceDelay} type={props.type} auth={props.auth}/>
                  </Grid>
                )) : 
                <div><h3 className='noAbsenceDelay'>Aucun(e) {props.type}</h3><HowToRegIcon fontSize='large' className='noAbsenceDelayIcon'/></div> 
                }
            </Grid>
        </Box>
    </div>
  )
}
