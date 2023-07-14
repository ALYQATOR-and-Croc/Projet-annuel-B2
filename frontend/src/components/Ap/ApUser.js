import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

import '../../styles/ApForm.css';

const ApUser = () => {
  const [formData, setFormData] = useState({
    fonction: '',
    idClasse: '',
    classes: [
      { id: 1, nom: 'B1-ESGI' },
      { id: 2, nom: 'B2-ESGI' },
      { id: 3, nom: 'B3-ESGI' },
    ],
    nom: '',
    prenom: '',
    email: '',
    mdp: '',
    idRole: 2,
    role: [
        { id: 1, nom: 'Étudiant'},
        { id: 2, nom: 'Ap'},
        { id: 3, nom: 'Reprographie'},
    ],
    libelleSpecialite: 'Informatique',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Vous pouvez effectuer d'autres opérations, comme envoyer les données au serveur ici.
  };

  const renderClassSelect = () => {
    if (formData.fonction === 1) {
      return (
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Classe</InputLabel>
          <Select
            name="idClasse"
            value={formData.idClasse}
            onChange={handleChange}
            required
          >
            {formData.classes.map((classe) => (
              <MenuItem key={classe.id} value={classe.id}>
                {classe.nom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }
    return null;
  };

  return (
    <div className='formEntier'>
     <div className='formTitre'>
         <t className='titre'>Formulaire d'ajout d'Utilisateur :</t>
     </div>
     <div className='formCase'>
    <form onSubmit={handleSubmit} style={{ marginRight: '60px', marginLeft: '60px', marginTop:'40px'}}>
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel>Fonction</InputLabel>
        <Select
          name="fonction"
          value={formData.fonction}
          onChange={handleChange}
          required
        >
          {formData.role.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.nom}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      {renderClassSelect()}
      <TextField
        label="Nom"
        name="nom"
        value={formData.nom}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: '20px', backgroundColor: 'white' }}
      />
      <TextField
        label="Prénom"
        name="prenom"
        value={formData.prenom}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: '20px', backgroundColor: 'white' }}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: '20px', backgroundColor: 'white' }}
      />
      <TextField
        label="Mot de passe"
        name="mdp"
        type="password"
        value={formData.mdp}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: '20px', backgroundColor: 'white' }}
      />
      <FormControl fullWidth style={{ marginBottom: '30px' }}>
        <InputLabel>Spécialité</InputLabel>
        <Select
          name="libelleSpecialite"
          value={formData.libelleSpecialite}
          onChange={handleChange}
          required
        >
          <MenuItem value="Informatique">Informatique</MenuItem>
          <MenuItem value="Mathématiques">Mathématiques</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Enregister
      </Button>
    </form>
    </div>
    </div>
  );
};

export default ApUser;
