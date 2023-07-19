import React, { useState } from 'react';
import { MenuItem, Select, TextField, Button, InputLabel, FormControl } from '@mui/material';
import { educationService } from '../../_services/education.service';
import { infraService } from '../../_services/infra.service';

const ApEduc = () => {
    const formObjects = [{ id: 1, nom: 'Cours' },{ id: 2, nom: 'Promotion' },{ id: 3 , nom: 'Matière' },{ id: 4, nom: 'Classe' }];
  
    const [selectedFormObject, setSelectedFormObject] = useState('');
    const [formDataCourse, setFormDataCourse] = useState({
        courseLabel: '',
        courseDate: '',
        courseDatetemp: '',
        startCourse: '',
        startCoursetemp: '',
        endCourse: '',
        endCoursetemp: '',
        idTeacher: '',
        idRespPedago: '',
        idAttachePromotion: '',
        idReprographe: '',
        idClassRoom: '',
        idCourseSubject: '',
        idClass: ''
    });
    const [formDataPromo, setFormDataPromo] = useState({
        libellePromotion : '',
        anneePromotion : '',
        anneePromotiontemp : '',
        domainePromotion : '',
        specialitePromotion : '',
        diplomePromotion : '',
        niveauEtude : '',
        idEcole : ''
    });
    const [formDataMatiere, setFormDataMatiere] = useState({
        libelleMatiere : '',
        idEcole : '',
        idIntervenant : ''
    });
    const [formDataClasse, setFormDataClasse] = useState({
        libelleClasse : '',
        idPromotion : '',
        idCampus : ''
    });

    const [getLists, setGetLists] = useState(false);

    const [schoolsList, setSchoolsList] = useState([]);
    const requestSchools = () => {
        infraService.schoolsList()
            .then(res => {
                setSchoolsList(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const [teachersList, setTeachersList] = useState([]);
    const requestTeachers = () => {
        educationService.teachersList()
            .then(res => {
                setTeachersList(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const [apList, setApList] = useState([]);
    const requestAp = () => {
        educationService.apList()
            .then(res => {
                setApList(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const [rpList, setRpList] = useState([]);
    const requestRp = () => {
        educationService.rpList()
            .then(res => {
                setRpList(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const [reproList, setReproList] = useState([]);
    const requestRepro = () => {
        educationService.reproList()
            .then(res => {
                setReproList(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const [promotionsList, setPromotionsList] = useState([]);
    const requestPromotions = () => {
        educationService.promotionsList()
            .then(res => {
                setPromotionsList(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const [matieresList, setMatieresList] = useState([]);
    const requestMatieres = () => {
        educationService.matieresList()
            .then(res => {
                setMatieresList(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    };

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

    const [roomsList, setRoomsList] = useState([]);
    const requestRooms = () => {
      infraService.roomsList()
          .then(res => {
              setRoomsList(res.data);
          })
          .catch(error => {
              console.log(error);
          })
    };

    const [campusList, setCampusList] = useState([]);
    const requestCampus = () => {
        infraService.campusList()
            .then(res => {  
                setCampusList(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    };

    if (!getLists) {
        requestCampus();
        requestSchools();
        requestAp();
        requestRepro();
        requestRp();
        requestPromotions();
        requestMatieres();
        requestTeachers();
        requestRooms();
        requestClasses();
        setGetLists(true);
      }

    const handleChangeObject = (e) => {
        setSelectedFormObject(e.target.value)
    };

  const handleChange = (e) => {
    let newValue = '';
    let newValueTemp = '';
    if (e.target.type === 'number') {
        newValue = e.target.valueAsNumber;
    } else if (e.target.type === 'date') {
        newValueTemp = e.target.value;
        newValue = e.target.valueAsDate.toISOString();
    } else if (e.target.type === 'time') {
        newValueTemp = e.target.value;
        newValue = formDataCourse.courseDate.substring(0, 10) + e.target.valueAsDate.toISOString().substring(10, e.target.valueAsDate.toISOString().length);
    } else {
        newValue = e.target.value;
    }
    switch (selectedFormObject) {
      case 'Classe':
        setFormDataClasse((prevData) => ({
          ...prevData,
          [e.target.name]: newValue
        }));
        break;
      case 'Matière':
        setFormDataMatiere((prevData) => ({
          ...prevData,
          [e.target.name]: newValue
        }));
        break;
      case 'Promotion':
        if (newValueTemp !== '') {
          setFormDataPromo((prevData) => ({
            ...prevData,
            [e.target.name]: newValueTemp,
            [`${e.target.name.substring(0, e.target.name.length - 4)}`]: newValue
          }));
        } else {
          setFormDataPromo((prevData) => ({
          ...prevData,
          [e.target.name]: newValue
        }));
        }
        break;
      case 'Cours':
        if (newValueTemp !== '') {
          setFormDataCourse((prevData) => ({
            ...prevData,
            [e.target.name]: newValueTemp,
            [`${e.target.name.substring(0, e.target.name.length - 4)}`]: newValue
          }));
        } else {
          setFormDataCourse((prevData) => ({
          ...prevData,
          [e.target.name]: newValue
        }));
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (selectedFormObject) {
      case 'Classe':
        console.log(formDataClasse);
        educationService.saveClasse(formDataClasse)
        .then(res => {
            window.location.reload(false); 
        })
        .catch(error => {
            console.log(error);
        })
        break;
      case 'Matière':
        console.log(formDataMatiere);
        educationService.saveMatiere(formDataMatiere)
        .then(res => {
            window.location.reload(false); 
        })
        .catch(error => {
            console.log(error);
        })
        break;
      case 'Promotion':
        educationService.savePromo(formDataPromo)
        .then(res => {
            window.location.reload(false); 
        })
        .catch(error => {
            console.log(error);
        })
        break;
      case 'Cours':
        console.log(formDataCourse);
        educationService.saveCourse(formDataCourse)
        .then(res => {
            console.log(res);  
            window.location.reload(false); 
        })
        .catch(error => {
            console.log(error);
        })
        break;
      default:
        break;
    }
  };

const Classe = () => {
  if (selectedFormObject === 'Classe') {
    return (
      <div>
        <TextField
          label="Libellé Classe"
          name="libelleClasse"
          value={formDataClasse.libelleClasse}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
        />

        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Promotion</InputLabel>
          <Select
            label="Promotion"
            name="idPromotion"
            value={formDataClasse.idPromotion}
            onChange={handleChange}
            required
          >
            {promotionsList.map((item) => (
              <MenuItem key={item.id_promotion} value={item.id_promotion}>
                {item.libelle_promotion}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Campus</InputLabel>
          <Select
            label="Campus"
            name="idCampus"
            value={formDataClasse.idCampus}
            onChange={handleChange}
            required
          >
            {campusList.map((item) => (
              <MenuItem key={item.id_campus} value={item.id_campus}>
                {item.libelle_campus}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
  return null;
  };

    const Matiere = () => {
      if (selectedFormObject === 'Matière') {
        return (
          <div>
            <TextField
          label="Libellé Matière"
          name="libelleMatiere"
          value={formDataMatiere.libelleMatiere}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
        />

        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>École</InputLabel>
          <Select
            label="École"
            name="idEcole"
            value={formDataMatiere.idEcole}
            onChange={handleChange}
            required
          >
            {schoolsList.map((item) => (
              <MenuItem key={item.id_ecole} value={item.id_ecole}>
                {item.libelle_ecole}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Intervenant</InputLabel>
          <Select
            label="Intervenant"
            name="idIntervenant"
            value={formDataMatiere.idIntervenant}
            onChange={handleChange}
            required
          >
            {teachersList.map((item) => (
              <MenuItem key={item.id_intervenant} value={item.id_intervenant}>
                {item.prenom} {item.nom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
  return null;
  };

  const Promotion = () => {
    if (selectedFormObject === 'Promotion') {
      return (
        <div>
            <TextField
          label="Libellé Promotion"
          name="libellePromotion"
          value={formDataPromo.libellePromotion}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
        />

        <TextField
          label="Année Promotion"
          name="anneePromotiontemp"
          type="date"
          value={formDataPromo.anneePromotiontemp}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Domaine Promotion"
          name="domainePromotion"
          value={formDataPromo.domainePromotion}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
        />

        <TextField
          label="Spécialité Promotion"
          name="specialitePromotion"
          value={formDataPromo.specialitePromotion}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
        />

        <TextField
          label="Diplôme Promotion"
          name="diplomePromotion"
          value={formDataPromo.diplomePromotion}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
        />

        <TextField
          label="Niveau d'Étude"
          name="niveauEtude"
          value={formDataPromo.niveauEtude}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
        />

<FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Ecole</InputLabel>
          <Select
            label="École"
            name="idEcole"
            value={formDataPromo.idEcole}
            onChange={handleChange}
            required
          >
            {schoolsList.map((item) => (
              <MenuItem key={item.id_ecole} value={item.id_ecole}>
                {item.libelle_ecole}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
    </div>
  );
}
return null;
};

const Cours = () => {
    if (selectedFormObject === 'Cours') {
      return (
        <div>
            <TextField
          label="Libellé du cours"
          name="courseLabel"
          value={formDataCourse.courseLabel}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
        />

        <TextField
          label="Date du cours"
          name="courseDatetemp"
          type="date"
          value={formDataCourse.courseDatetemp}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Heure de début du cours"
          name="startCoursetemp"
          type="time"
          value={formDataCourse.startCoursetemp}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // intervalles de 5 minutes
          }}
        />

        <TextField
          label="Heure de fin du cours"
          name="endCoursetemp"
          type="time"
          value={formDataCourse.endCoursetemp}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // intervalles de 5 minutes
          }}
        />

          <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Intervenant</InputLabel>
          <Select
            label="Intervenant"
            name="idTeacher"
            value={formDataCourse.idTeacher}
            onChange={handleChange}
            required
          >
            {teachersList.map((item) => (
              <MenuItem key={item.id_intervenant} value={item.id_intervenant}>
                {item.prenom} {item.nom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Responsable pédagogique</InputLabel>
          <Select
            label="Responsable pédagogique"
            name="idRespPedago"
            value={formDataCourse.idRespPedago}
            onChange={handleChange}
            required
          >
            {rpList.map((item) => (
              <MenuItem key={item.id_responsable_pedagogique} value={item.id_responsable_pedagogique}>
                {item.prenom} {item.nom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Attaché de promotion</InputLabel>
          <Select
            label="Attaché de promotion"
            name="idAttachePromotion"
            value={formDataCourse.idAttachePromotion}
            onChange={handleChange}
            required
          >
            {apList.map((item) => (
              <MenuItem key={item.id_attache_de_promotion} value={item.id_attache_de_promotion}>
                {item.prenom} {item.nom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Reprographe</InputLabel>
          <Select
            label="Reprographe"
            name="idReprographe"
            value={formDataCourse.idReprographe}
            onChange={handleChange}
            required
          >
            {reproList.map((item) => (
              <MenuItem key={item.id_reprographe} value={item.id_reprographe}>
                {item.prenom} {item.nom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Salle de classe</InputLabel>
          <Select
            label="Salle de classe"
            name="idClassRoom"
            value={formDataCourse.idClassRoom}
            onChange={handleChange}
            required
          >
            {roomsList.map((item) => (
              <MenuItem key={item.id_salle} value={item.id_salle}>
                {campusList.find(campus=>campus.id_campus === item.id_campus).libelle_campus} - {item.libelle_salle}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Matière du cours</InputLabel>
          <Select
            label="Matière du cours"
            name="idCourseSubject"
            value={formDataCourse.idCourseSubject}
            onChange={handleChange}
            required
          >
            {matieresList.map((item) => (
              <MenuItem key={item.id_matiere} value={item.id_matiere}>
                {item.libelle_matiere}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Classe</InputLabel>
          <Select
            label="Classe"
            name="idClass"
            value={formDataCourse.idClass}
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
        </div>
      );
    }
    return null;
    };


  return (
    <div className='formEntier'>
     <div className='formCase'></div>
    <form onSubmit={handleSubmit} style={{ marginRight: '60px', marginLeft: '60px', marginTop:'40px'}}>
     
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Création</InputLabel>
          <Select
            label="Création"
            name="libelleCreation"
            value={selectedFormObject}
            onChange={handleChangeObject}
            required
          >
            {formObjects.map((item) => (
              <MenuItem key={item.id} value={item.nom}>
                {item.nom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      
        {/* {Ecole()}
        {Campus()} */}
        {Matiere()}
        {Classe()}
        {Promotion()}
        {Cours()}
      <Button type="submit" variant="contained" color="primary" style={{ marginBottom: '20px' }}>
        Ajouter
      </Button>
    </form>
    </div>
  );
};

export default ApEduc;