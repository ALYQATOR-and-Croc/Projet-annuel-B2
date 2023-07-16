import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../../styles/AbsenceDelayCard.css';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Divider } from '@mui/material';

export default function AbsenceDelayCard(props) {

    const date = props.infos.date;
    const matiere = props.infos.matiere;
    const heure = props.infos.heure;
    const prof = props.infos.prof;
    // const justified = props.infos.justified;

    // const justifyStatusRender = (status) => {
    //     if (status === true) {
    //         return (
    //             <div className='absenceDelayJustified'>
    //                 <div className='justifyStatus'>
    //                     <CheckCircleIcon className='justifyStatusIcon'/>
    //                     <Typography variant="h6">
    //                         Justifié 
    //                     </Typography>
    //                 </div>
    //             </div>
    //         )
    //     } else {
    //         return (
    //             <div className='absenceDelayJustify'>
    //                 <div className='justifyStatus'>
    //                     <CancelIcon className='justifyStatusIcon'/>
    //                     <Typography variant="h6">
    //                         Non justifié 
    //                     </Typography>
    //                 </div>
    //                 <Button 
    //                 href={`mailto:${props.mailap}?subject=Justificatif ${props.type} du ${props.infos.date}`} 
    //                 target='_blank' 
    //                 size="small" 
    //                 variant="contained" 
    //                 startIcon={<AttachEmailIcon/>}>Justifier</Button>
    //             </div>
    //         )
    //     }
    // }

    return (
        <div className='AbsenceDelayCard'>
            <Card>
                <CardContent className='AbsenceDelayCardContent'>
                    <div className='absenceDelay'>
                        <div className='absenceDelayInfos'>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {date}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {matiere}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {heure}
                            </Typography>
                            <Typography variant="body2">
                                {prof}
                            </Typography>
                        </div>
                        <Divider orientation="vertical" flexItem></Divider>
                        <div className='absenceDelayJustify'>
                            <Button 
                            href={`mailto:${props.mailap}?subject=Justificatif ${props.type} du ${props.infos.date}`} 
                            target='_blank' 
                            size="large" 
                            variant="contained" 
                            startIcon={<AttachEmailIcon/>}>
                                Justifier
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
