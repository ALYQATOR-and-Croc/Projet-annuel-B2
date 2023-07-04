import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import RegisterStudentsCard from './RegisterStudentsCard';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export default function RegisterStudentsGrid(props) {

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
                    <RegisterStudentsCard infos={absenceDelay} mailap={props.mailap} type={props.type}/>
                  </Grid>
                )) : 
                ((props.type === 'retard') ? <div><h3 className='noAbsenceDelay'>Aucun {props.type}</h3><HowToRegIcon fontSize='large' className='noAbsenceDelay'/></div> 
                : <div><h3 className='noAbsenceDelay'>Aucun {props.type}</h3><HowToRegIcon fontSize='large' className='noAbsenceDelayIcon'/></div>) }
            </Grid>
        </Box>
    </div>
  )
}
