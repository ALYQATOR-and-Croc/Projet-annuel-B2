import React, { useState } from 'react';
import { MenuItem, Select, TextField, Button, InputLabel, FormControl } from '@mui/material';
import { infraService } from '../../_services/infra.service';

const ApInfraAdd = () => {
  const formObjects = [{ id: 1, nom: 'École' },{ id: 2, nom: 'Campus' },{ id: 3, nom: 'Salle' }];
  
  const [selectedFormObject, setSelectedFormObject] = useState('');
  const [formDataSchool, setFormDataSchool] = useState({
    libelleEcole: '',
    domaineEcole: ''
  });
  const [formDataCampus, setFormDataCampus] = useState({
    libelle_campus : '',
    adresse_campus : '',
    codePostalCampus : 69003
  });
  const [formDataRoom, setFormDataRoom] = useState({
    libelleRoom : '',
    floor :  0,
    roomCapacity : 30,
    idCampus : ''
  });

  const [campusList, setCampusList] = useState([]);
  const [getCampusList, setGetCampusList] = useState(false);

  const requestCampus = () => {
    infraService.campusList()
        .then(res => {
            console.log(res);  
            setCampusList(res.data);
        })
        .catch(error => {
            console.log(error);
        })
  };

  if (!getCampusList) {
    requestCampus();
    setGetCampusList(true);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (selectedFormObject) {
      case 'École':
        console.log(formDataSchool);
        infraService.saveSchool(formDataSchool)
        .then(res => {
            console.log(res);  
            window.location.reload(false); // changer ?
        })
        .catch(error => {
            console.log(error);
        })
        break;
      case 'Campus':
        console.log(formDataCampus);
        infraService.saveCampus(formDataCampus)
        .then(res => {
            console.log(res);  
            window.location.reload(false); // changer ?
        })
        .catch(error => {
            console.log(error);
        })
        break;
      case 'Salle':
        console.log(formDataRoom);
        infraService.saveRoom(formDataRoom)
        .then(res => {
            console.log(res);  
            window.location.reload(false); // changer ?
        })
        .catch(error => {
            console.log(error);
        })
        break;
      default:
        break;
    }
  };

const Ecole = () => {
  if (selectedFormObject === 'École') {
    return (
      <div>
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
        <TextField
          name="libelle_campus"
          label="Libellé du campus"
          value={formDataCampus.libelle_campus}
          onChange={handleChange}
          fullWidth
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
          required
        />
        <TextField
          name="adresse_campus"
          label="Adresse du campus"
          value={formDataCampus.adresse_campus}
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
      
        {Ecole()}
        {Campus()}
        {Salle()}
        {(selectedFormObject !== '')  ?           
      <Button type="submit" variant="contained" color="primary">
        Ajouter
      </Button> : null}
    </form>
    </div>
  );
};

export default ApInfraAdd;