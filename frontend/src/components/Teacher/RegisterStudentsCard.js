import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../../styles/AbsenceDelayCard.css';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Divider } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';

export default function RegisterStudentsCard(props) {

    const date = props.infos.date;
    const matiere = props.infos.matiere;
    const heure = props.infos.heure;
    const classe = props.infos.classe;
    // const Emarger = props.infos.Emarger;

    // const justifyStatusRender = (status) => {
    //     if (status === true) {
    //         return (
    //             <div className='absenceDelayJustified'>
    //                 <div className='justifyStatus'>
    //                     <CheckCircleIcon className='justifyStatusIcon'/>
    //                     <Typography variant="h6">
    //                         Émargé
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
    //                         Non émargé 
    //                     </Typography>
    //                 </div>
    //                 <Button 
    //                 href='/teacher/register-students' 
    //                 size="small" 
    //                 variant="contained" 
    //                 startIcon={<ListAltIcon/>}>Émarger</Button>
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
                                {classe}
                            </Typography>
                        </div>
                        <Divider orientation="vertical" flexItem></Divider>
                        <div className='registerStudentsEmarge'>
                            <Button 
                            href='/teacher/register-students' 
                            size="large" 
                            variant="contained" 
                            startIcon={<ListAltIcon/>}>Émarger</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
