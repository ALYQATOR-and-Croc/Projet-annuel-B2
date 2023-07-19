import React, { useState } from 'react';
import { MenuItem, Select, TextField, Button, InputLabel, FormControl } from '@mui/material';
import { infraService } from '../_services/infra.service';

const AdminInfraChange = () => {
  const formObjects = [{ id: 1, nom: 'École' },{ id: 2, nom: 'Campus' },{ id: 3, nom: 'Salle' }];
  
  const [selectedFormObject, setSelectedFormObject] = useState('');
  const [idSchool, setIdSchool] = useState('');
  const [formDataSchool, setFormDataSchool] = useState({
    libelleEcole: '',
    domaineEcole: ''
  });
  const [idCampus, setIdCampus] = useState('');
  const [formDataCampus, setFormDataCampus] = useState({
    libelleCampus : '',
    adresseCampus : '',
    codePostalCampus : 69003
  });
  const [idRoom, setIdRoom] = useState('');
  const [formDataRoom, setFormDataRoom] = useState({
    libelleRoom : '',
    floor :  0,
    roomCapacity : 30,
    idCampus : ''
  });
    
  const [getCampusSchoolsRooms, setGetCampusSchoolsRooms] = useState(false);

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

  if (!getCampusSchoolsRooms) {
    requestCampus();
    requestSchools();
    requestRooms();
    setGetCampusSchoolsRooms(true);
  }

  const handleChange = (e) => {
    let newValue = '';
        if (e.target.type === 'number') {
          newValue = e.target.valueAsNumber;
        } else {
          newValue = e.target.value;
        }
    switch (selectedFormObject) {
      case 'École':
        setFormDataSchool((prevData) => ({
          ...prevData,
          [e.target.name]: newValue
        }));
        break;
      case 'Campus':
        setFormDataCampus((prevData) => ({
          ...prevData,
          [e.target.name]: newValue
        }));
        break;
      case 'Salle':
        setFormDataRoom((prevData) => ({
          ...prevData,
          [e.target.name]: newValue
        }));
        break;
      default:
        break;
    }
  };

  const handleChangeObject = (e) => {
    setSelectedFormObject(e.target.value)
  };

  const handleChangeSchoolId = (e) => {
    setIdSchool(e.target.value);
    let selectedSchool = schoolsList.find(school=>school.id_ecole === e.target.value);
    setFormDataSchool({
        libelleEcole: selectedSchool.libelle_ecole,
        domaineEcole: selectedSchool.domaine_ecole 
    });
  };

  const handleChangeRoomId = (e) => {
    setIdRoom(e.target.value);
    let selectedRoom = roomsList.find(room=>room.id_salle === e.target.value);
    setFormDataRoom({
        libelleRoom : selectedRoom.libelle_salle,
        floor : selectedRoom.etage,
        roomCapacity : selectedRoom.capacite_salle,
        idCampus : selectedRoom.id_campus
    });
  };

  const handleChangeCampusId = (e) => {
    setIdCampus(e.target.value);
    let selectedCampus = campusList.find(campus=>campus.id_campus === e.target.value);
    setFormDataCampus({
        libelleCampus : selectedCampus.libelle_campus,
        adresseCampus : selectedCampus.adresse_campus,
        codePostalCampus : selectedCampus.codepostal_campus
    });
  };

  const handleSubmitChange = (e) => {
    e.preventDefault();
    switch (selectedFormObject) {
        case 'École':
          console.log(idSchool, formDataSchool);
          infraService.changeSchool(idSchool, formDataSchool)
          .then(res => {
              console.log(res);  
          })
          .catch(error => {
              console.log(error);
          })
          requestSchools();
          break;
        case 'Campus':
          console.log(idCampus, formDataCampus);
          infraService.changeCampus(idCampus, formDataCampus)
          .then(res => {
              console.log(res);  
          })
          .catch(error => {
              console.log(error);
          })
          requestCampus();
          break;
        case 'Salle':
          console.log(idRoom, formDataRoom);
          infraService.changeRoom(idRoom, formDataRoom)
          .then(res => {
              console.log(res);  
          })
          .catch(error => {
              console.log(error);
          })
          requestRooms();
          break;
        default:
          break;
      }
  }

  const handleSubmitDelete = (e) => {
    e.preventDefault();
    switch (selectedFormObject) {
        case 'École':
          console.log(idSchool);
          infraService.removeSchool(idSchool)
          .then(res => {
              console.log(res);  
          })
          .catch(error => {
              console.log(error);
          })
          requestSchools();
          setFormDataSchool({
            libelleEcole: '',
            domaineEcole: ''
          });
          setIdSchool('');
          break;
        case 'Campus':
          console.log(idCampus);
          infraService.removeCampus(idCampus)
          .then(res => {
              console.log(res);  
          })
          .catch(error => {
              console.log(error);
          })
          requestCampus();
          setFormDataCampus({
            libelleCampus : '',
            adresseCampus : '',
            codePostalCampus : 69003
          });
          setIdCampus('');
          break;
        case 'Salle':
          console.log(idRoom);
          infraService.removeRoom(idRoom)
          .then(res => {
              console.log(res);  
          })
          .catch(error => {
              console.log(error);
          })
          requestRooms();
          setFormDataRoom({
            libelleRoom : '',
            floor :  0,
            roomCapacity : 30,
            idCampus : ''
          });
          setIdRoom('');
          break;
        default:
          break;
      }
  }

const Ecole = () => {
  if (selectedFormObject === 'École') {
    return (
      <div>
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Choisissez une école</InputLabel>
          <Select
            label="Choisissez une école"
            name="idSchool"
            value={idSchool}
            onChange={handleChangeSchoolId}
          >
            {schoolsList.map((items) => (
              <MenuItem key={items.id_ecole} value={items.id_ecole}>
                {items.libelle_ecole}
              </MenuItem>
            ))}
          </Select>
        </FormControl>  
      <TextField
        name="libelleEcole"
        label="Libellé de l'école"
        value={formDataSchool.libelleEcole}
        onChange={handleChange}
        fullWidth
        style={{ marginBottom: '20px', backgroundColor: 'white' }}
        required
      />
      <TextField
        name="domaineEcole"
        label="Domaine de l'école"
        value={formDataSchool.domaineEcole}
        onChange={handleChange}
        fullWidth
        style={{ marginBottom: '20px', backgroundColor: 'white' }}
        required
      />
      </div>
    );
  }
  return null;
  };

  const Campus = () => {
    if (selectedFormObject === 'Campus') {
      return (
        <div>
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Choisissez un campus</InputLabel>
          <Select
            label="Choisissez un campus"
            name="idCampus"
            value={idCampus}
            onChange={handleChangeCampusId}
          >
            {campusList.map((items) => (
              <MenuItem key={items.id_campus} value={items.id_campus}>
                {items.libelle_campus}
              </MenuItem>
            ))}
          </Select>
        </FormControl>      
        <TextField
          name="libelleCampus"
          label="Libellé du campus"
          value={formDataCampus.libelleCampus}
          onChange={handleChange}
          fullWidth
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
          required
        />
        <TextField
          name="adresseCampus"
          label="Adresse du campus"
          value={formDataCampus.adresseCampus}
          onChange={handleChange}
          fullWidth
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
          required
        />
        <TextField
          name="codePostalCampus"
          label="Code postal du campus"
          type="number"
          value={parseInt(formDataCampus.codePostalCampus)}
          onChange={handleChange}
          fullWidth
          style={{ marginBottom: '20px', backgroundColor: 'white'}}
          required
        />
        </div>
      );
    }
    return null;
    };

    const Salle = () => {
      if (selectedFormObject === 'Salle') {
        return (
          <div>
          <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Choisissez une salle</InputLabel>
          <Select
            label="Choisissez une école"
            name="idRoom"
            value={idRoom}
            onChange={handleChangeRoomId}
          >
            {roomsList.map((items) => (
              <MenuItem key={items.id_salle} value={items.id_salle}>
                {campusList.find(campus=>campus.id_campus === items.id_campus).libelle_campus} - {items.libelle_salle}
              </MenuItem>
            ))}
          </Select>
        </FormControl> 
          <TextField
            name="libelleRoom"
            label="Numéro / nom de salle"
            type="test"
            value={formDataRoom.libelleRoom}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: '20px', backgroundColor: 'white' }}
            required
          />
          <TextField
            name="floor"
            label="Étage"
            type="number"
            value={formDataRoom.floor}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: '20px', backgroundColor: 'white' }}
            required
          />
          <TextField
            name="roomCapacity"
            label="Capacité de la salle"
            type="number"
            value={formDataRoom.roomCapacity}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: '20px', backgroundColor: 'white' }}
            required
          />
          <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Campus</InputLabel>
          <Select
            label="Campus"
            name="idCampus"
            value={formDataRoom.idCampus}
            onChange={handleChange}
          >
            {campusList.map((items) => (
              <MenuItem key={items.id_campus} value={items.id_campus}>
                {items.libelle_campus}
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
    <form style={{ marginRight: '60px', marginLeft: '60px', marginTop:'40px'}}>
     
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Modification</InputLabel>
          <Select
            label="Modification"
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
      
        {Ecole()}
        {Campus()}
        {Salle()}
        
        {(selectedFormObject !== '') && (idSchool !== '' || idCampus !== '' || idRoom !== '') ? 
        <div><Button type="button" variant="contained" color="primary" style={{marginRight:50}} onClick={handleSubmitChange}>Enregistrer</Button>
        <Button type="button" variant="contained" color="error" style={{marginLeft:50}} onClick={handleSubmitDelete}>Supprimer</Button></div> : null}
    </form>
    </div>
  );
};

export default AdminInfraChange;