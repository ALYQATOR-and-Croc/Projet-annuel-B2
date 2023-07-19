import React, { useState } from 'react';
import '../../styles/ApAbsence.css';
import AbsenceDelayGrid from '../Student/AbsenceDelayGrid';
import { Divider } from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { educationService } from '../../_services/education.service';
import { courseService } from '../../_services/course.service';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';

export default function ApAbsence(props) {
    const [absences, setAbsences] = useState([]);
    const [delays, setDelays] = useState([]);
    const [getAbsenceDelays, setGetAbsenceDelays] = useState(true);
    const [getClassesList, setGetClassesList] = useState(true);
    const [getStudentsList, setGetStudentsList] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState({
        idStudent: '',
        nom: '',
        prenom: '',
    });
    const [selectedClass, setSelectedClass] = useState({
        idClasse: '',
        libelle_classe: '',
    });

    const [classesList, setClassesList] = useState([]);
    const requestClasses = () => {
        educationService.classesList()
            .then(res => {
                setClassesList(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const [studentsList, setStudentsList] = useState([]);
    const requestStudents = () => {
        educationService.studentsFromClassList(selectedClass.idClasse)
            .then(res => {
                setStudentsList(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    };
  
  const formatAbsenceDelay = (inputArray) => {
    let outputArray = [];
    inputArray.forEach((presence)=>{
      let dateAbsenceDelay = presence.date_cours.substr(8,2) + '/' 
      + presence.date_cours.substr(5,2) + '/' 
      + presence.date_cours.substr(0,4);
      let heureAbsenceDelay = presence.heure_debut_cours.substr(11,5).replace(':', 'h') 
      + '-' + presence.heure_fin_cours.substr(11,5).replace(':', 'h');
      let typeAbsenceDelay = "absence";
      if (presence.en_retard === true) {
        typeAbsenceDelay = "retard";
      }
      outputArray.push(
        {
          id:presence.id_presence, 
          date:dateAbsenceDelay,
          heure:heureAbsenceDelay,
          matiere: presence.libelle_matiere.toUpperCase(), 
          prof : (presence.nom_intervenant[0] + '.' + presence.prenom_intervenant).toUpperCase(),
          mailap : presence.email_attache_de_promotion,
          type : typeAbsenceDelay
        }
      );
    })
    return outputArray;
  };

  const requestAbsenceDelays = (idUser) => {
    courseService.getPresence(idUser)
        .then(res => {
            console.log(res); 
            let resList = undefined;  
            if (!Array.isArray(res.data)) {
              resList = [res.data];
            } else {
              resList = res.data;
            }
            let resListAbsences = resList.filter((presence) => presence.est_absent === true);
            let resListDelays = resList.filter((presence) => presence.en_retard === true);
            let absencesList = formatAbsenceDelay(resListAbsences);
            let delaysList = formatAbsenceDelay(resListDelays);
            setAbsences(absencesList);
            setDelays(delaysList);
        })
        .catch(error => {
            console.log(error);
        })
  }

  if (getClassesList) {
    requestClasses();
    setGetClassesList(false);
  }

  if (selectedClass.idClasse !== '' && getStudentsList) {
    requestStudents();
    setGetStudentsList(false);
  }

  if (selectedStudent.idStudent !== '' && getAbsenceDelays) {
    requestAbsenceDelays(selectedStudent.idStudent);
    setGetAbsenceDelays(false);
  }

  const handleChange = (e) => {
    let newValue = '';
        if (e.target.type === 'number') {
            newValue = e.target.valueAsNumber;
        } else {
            newValue = e.target.value;
        }
    switch (e.target.name) {
      case 'idClasse':
        setSelectedClass((prevData) => ({
          ...prevData,
          [e.target.name]: newValue
        }));
        setGetStudentsList(true);
        break;
      case 'idStudent':
        setSelectedStudent((prevData) => ({
          ...prevData,
          [e.target.name]: newValue
        }));
        setGetAbsenceDelays(true);
        break;
      default:
        break;
    }
  };

  
    return (
        <div className="ApAbsence">
                <div className='ApAbsenceStudent'>
                    <h1 className='absencesTitle'>
                    <PersonSearchIcon className='delaysTitleLogo' fontSize='large'/>
                    Étudiant
                    </h1><br></br>
                    <h3 className='absencesTitle'>Choisissez un élève</h3>
                    <div>
                        <FormControl fullWidth style={{ marginBottom: '20px' }}>
                            <InputLabel>Classe</InputLabel>
                            <Select
                                label="Classe"
                                name="idClasse"
                                value={selectedClass.idClasse}
                                onChange={handleChange}
                                required
                            >
                                {classesList.map((item) => (
                                <MenuItem key={item.id_classe} value={item.id_classe}>
                                    {item.libelle_classe}
                                </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {selectedClass.idClasse === '' ? 
                        <FormControl fullWidth style={{ marginBottom: '20px' }}>
                            <InputLabel>Élève</InputLabel>
                            <Select
                                disabled
                                label="Élève"
                                name="idStudent"
                                style={{ backgroundColor: 'lightgray' }}
                                value={selectedStudent.idStudent}
                                onChange={handleChange}
                                required
                            >
                                {studentsList.map((item) => (
                                <MenuItem key={item.idEtudiant} value={item.idEtudiant}>
                                    {item.prenomUtilisateur} {item.nomUtilisateur}
                                </MenuItem>
                                ))}
                            </Select>
                        </FormControl> :
                        <FormControl fullWidth style={{ marginBottom: '20px' }}>
                        <InputLabel>Élève</InputLabel>
                        <Select
                            label="Élève"
                            name="idStudent"
                            value={selectedStudent.idStudent}
                            onChange={handleChange}
                            required
                        >
                            {studentsList.map((item) => (
                            <MenuItem key={item.idEtudiant} value={item.idEtudiant}>
                                {item.prenomUtilisateur} {item.nomUtilisateur}
                            </MenuItem>
                            ))}
                        </Select>
                    </FormControl>}
                    </div>
                </div>
            <Divider orientation="vertical" flexItem></Divider>
            <div className='ApAbsences'>
                <h1 className='absencesTitle'>
                <PersonOffIcon className='delaysTitleLogo' fontSize='large'/>
                Absences
                </h1>
                <AbsenceDelayGrid data={absences} type="absence" auth="admin"/>
            </div>
            <Divider orientation="vertical" flexItem></Divider>
            <div className='ApDelays'>
            <h1 className='delaysTitle'>
                <AccessAlarmIcon className='delaysTitleLogo' fontSize='large'/>
                Retards
            </h1>
                <AbsenceDelayGrid data={delays} type="retard" auth="admin"/>
            </div>
    </div>
    )
}