import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../../styles/AbsenceDelayCard.css';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Divider } from '@mui/material';
import { courseService } from '../../_services/course.service';

export default function AbsenceDelayCard(props) {

    const id = props.infos.id;
    const date = props.infos.date;
    const matiere = props.infos.matiere;
    const heure = props.infos.heure;
    const prof = props.infos.prof;
    const mailap = props.infos.mailap;
    const type = props.infos.type;

    const removeAbsenceDelay = () => {
        courseService.setPresence(id, {"isAbsent" : false,"isLate" : false,"hasSigned": true})
        .then(res => {
            window.location.reload(false);
        })
        .catch(error => {
            console.log(error);
        })
    }

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
                            <Typography variant="body1" component="div">{type.toUpperCase()}</Typography>
                            {props.auth === "admin" ? <Button 
                            onClick={removeAbsenceDelay} 
                            size="large" 
                            variant="contained" 
                            startIcon={<EventAvailableIcon/>}>
                                Retirer
                            </Button> : <Button 
                            href={`mailto:${mailap}?subject=Justificatif ${type} du ${date}`} 
                            target='_blank' 
                            size="large" 
                            variant="contained" 
                            startIcon={<AttachEmailIcon/>}>
                                Justifier
                            </Button>}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
