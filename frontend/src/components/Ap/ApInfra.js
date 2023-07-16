import React, { useState } from 'react';
import { MenuItem, Select, TextField, Button, InputLabel, FormControl } from '@mui/material';

const ApInfra = () => {
  const [formData, setFormData] = useState({
    libelleCreation: '',
    creation: [
      { id: 1, nom: 'École' },
      { id: 2, nom: 'Campus' },
      { id: 3, nom: 'Salle' },
    ],
    libelleEcole: '',
    domaineEcole: '',
    libelle_campus : '',
    adresse_campus : '',
    codePostalCampus : '',
    libelleRoom : '',
    floor : '',
    roomCapacity : '',
    idCampus : '' ,
    idCampusName : [
      { id: 1, nom: 'ESGI-LYON' },
      { id: 2, nom: 'ESGI-PARIS' },
      { id: 3, nom: 'ESGI-MONTPELLIER' },
    ],
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Vous pouvez utiliser les données ici ou les envoyer à votre backend
  };

const Ecole = () => {
  if (formData.libelleCreation === 'École') {
    return (
      <div>
      <TextField
        name="libelleEcole"
        label="Libellé de l'école"
        value={formData.libelleEcole}
        onChange={handleChange}
        fullWidth
        style={{ marginBottom: '20px', backgroundColor: 'white' }}
      />
      <TextField
        name="domaineEcole"
        label="Domaine de l'école"
        value={formData.domaineEcole}
        onChange={handleChange}
        fullWidth
        style={{ marginBottom: '20px', backgroundColor: 'white' }}
      />
      </div>
    );
  }
  return null;
  };

  const Campus = () => {
    if (formData.libelleCreation === 'Campus') {
      return (
        <div>
        <TextField
          name="libelle_campus"
          label="Libellé du campus"
          value={formData.libelle_campus}
          onChange={handleChange}
          fullWidth
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
        />
        <TextField
          name="adresse_campus"
          label="Adresse du campus"
          value={formData.adresse_campus}
          onChange={handleChange}
          fullWidth
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
        />
        <TextField
          name="codePostalCampus"
          label="Code postal du campus"
          type="number"
          value={formData.codePostalCampus}
          onChange={handleChange}
          fullWidth
          style={{ marginBottom: '20px', backgroundColor: 'white'}}
        />
        </div>
      );
    }
    return null;
    };

    const Salle = () => {
      if (formData.libelleCreation === 'Salle') {
        return (
          <div>
          <TextField
            name="libelleRoom"
            label="Numéro de salle"
            type="number"
            value={formData.libelleRoom}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: '20px', backgroundColor: 'white' }}
          />
          <TextField
            name="floor"
            label="Étage"
            type="number"
            value={formData.floor}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: '20px', backgroundColor: 'white' }}
          />
          <TextField
            name="roomCapacity"
            label="Capacité de la salle"
            type="number"
            value={formData.roomCapacity}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: '20px', backgroundColor: 'white' }}
          />
          <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel></InputLabel>
          <Select
            name="idCampus"
            value={formData.idCampus}
            onChange={handleChange}
          >
            {formData.idCampusName.map((items) => (
              <MenuItem key={items.id} value={items.nom}>
                {items.nom}
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
     <div className='formTitre'>
         <h1 className='titre'>Formulaire d'ajout d'Infrastructure :</h1>
     </div>
     <div className='formCase'></div>
    <form onSubmit={handleSubmit} style={{ marginRight: '60px', marginLeft: '60px', marginTop:'40px'}}>
     
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Création</InputLabel>
          <Select
            name="libelleCreation"
            value={formData.libelleCreation}
            onChange={handleChange}
            required
          >
            {formData.creation.map((item) => (
              <MenuItem key={item.id} value={item.nom}>
                {item.nom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      
        {Ecole()}
        {Campus()}
        {Salle()}

      <Button type="submit" variant="contained" color="primary">
        Ajouter
      </Button>
    </form>
    </div>
  );
};

export default ApInfra;