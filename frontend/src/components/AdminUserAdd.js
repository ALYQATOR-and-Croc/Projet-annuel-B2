import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { userService } from '../_services/user.service';
import { accountService } from '../_services/account.service';
import '../styles/ApForm.css';

const AdminUserAdd = () => {
  const isAdmin = accountService.getUserRole() === "ADMINISTRATEUR"; 
  const isRp = accountService.getUserRole() === "RESPONSABLE_PEDA"; 
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    mdp: '',
    idRole: '',
    fonction: '',
    idClasse: '',
    libelleSpecialite: ''
  });
  const [getClassesAndRoles, setGetClassesAndRoles] = useState(false);
  const [adminCheck, setAdminCheck] = useState(false);
  const [classes, setClasses] = useState([]);
  const [roles, setRoles] = useState([]);

  const noAdmin = () => {
    if (!isAdmin) {
      if (!isRp) {
        setRoles(roles.filter(role=>role.id_role_utilisateur===2));
      } else {
        setRoles(roles.filter(role=>role.id_role_utilisateur!==1));
      }
    }
  }

  const requestRoles = () => {
    userService.rolesList()
        .then(res => {
            console.log(res);  
            setRoles(res.data);
        })
        .catch(error => {
            console.log(error);
        })
  };

  const requestClasses = () => {
    userService.classesList()
        .then(res => {
            console.log(res);  
            setClasses(res.data);
        })
        .catch(error => {
            console.log(error);
        })
  };

  const saveUser = (userData) => {
    userService.saveUser(userData)
        .then(res => {
            console.log(res);  
        })
        .catch(error => {
            console.log(error);
        })
  };

  if (!getClassesAndRoles) {
    requestClasses();
    requestRoles();
    setGetClassesAndRoles(true);
  }

  if (getClassesAndRoles && !adminCheck && roles.length > 0) {
    noAdmin();
    setAdminCheck(true);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(()=>{
    if (formData.idRole !== '') {
      const choseRole = roles.find((role) => role.id_role_utilisateur === formData.idRole);
      setFormData({ ...formData, fonction: choseRole.libelle_role});
    }
  }, [formData.idRole, formData, roles])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.idRole !== 2) {
      delete formData.idClasse;
      console.log(formData);
      saveUser(formData);
      setFormData({ ...formData, idClasse: ""});
      window.location.reload(false); // changer ?
    } else {
      console.log(formData);
      saveUser(formData);
      window.location.reload(false); // changer ?
    }
  };

  const renderClassSelect = () => {
    if (formData.idRole === 2) {
      return (
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Classe</InputLabel>
          <Select
            label="Classe"
            name="idClasse"
            value={formData.idClasse}
            onChange={handleChange}
            required
          >
            {classes.map((classe) => (
              <MenuItem key={classe.id_classe} value={classe.id_classe}>
                {classe.libelle_classe}
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
     <div className='formCase'>
    <form onSubmit={handleSubmit} style={{ marginRight: '60px', marginLeft: '60px', marginTop:'40px'}}>
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel>Fonction</InputLabel>
        <Select
          label='Fonction'
          name="idRole"
          value={formData.idRole}
          onChange={handleChange}
          required
        >
          {roles.map((role) => (
              <MenuItem key={role.id_role_utilisateur} value={role.id_role_utilisateur}>
                {role.libelle_role.replace(/_/gm, ' ')}
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
      <Button type="submit" variant="contained" color="primary">
        Ajouter {formData.prenom}
      </Button>
    </form>
    </div>
    </div>
  );
};

export default AdminUserAdd;
