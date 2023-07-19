import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { userService } from '../_services/user.service';
import { educationService } from '../_services/education.service';
import { accountService } from '../_services/account.service';
import '../styles/ApForm.css';

const AdminUserChange = () => {
  const isAdmin = accountService.getUserRole() === "ADMINISTRATEUR"; 
  const isRp = accountService.getUserRole() === "RESPONSABLE_PEDA"; 
  const [selectedFormObject, setSelectedFormObject] = useState('');
  const [idUser, setIdUser] = useState('');
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    idRole: '',
    ancienneFonction: '',
    fonction:'',
    fonctionParameters: {
        idClasse: '',
        libelleSpecialite: ''
    }
  });
  const [getLists, setGetLists] = useState(false);
  const [adminCheck, setAdminCheck] = useState(false);
  const [classes, setClasses] = useState([]);
  const [roles, setRoles] = useState([]);

  const noAdmin = () => {
    if (!isAdmin) {
      if (!isRp) {
        setRoles(roles.filter(role=>role.id_role_utilisateur==2));
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
    
    const [studentsList, setStudentsList] = useState([]);
    const requestStudents = () => {
        userService.studentsList()
            .then(res => {
                setStudentsList(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const [adminsList, setAdminsList] = useState([]);
    const requestAdmins = () => {
        userService.adminsList()
            .then(res => {
                setAdminsList(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    };

  if (!getLists) {
    requestClasses();
    requestRoles();
    requestAp();
    requestRp();
    if (isAdmin) {
        requestAdmins();
    }
    requestStudents();
    requestRepro();
    requestTeachers();
    setGetLists(true);
  }

  if (getLists && !adminCheck && roles.length > 0) {
    noAdmin();
    setAdminCheck(true);
  }

  const handleChangeObject = (e) => {
    setSelectedFormObject(e.target.value)
    setIdUser('');
    setFormData({
        nom: '',
        prenom: '',
        email: '',
        idRole: '',
        ancienneFonction: '',
        fonction:'',
        fonctionParameters: {
            idClasse: '',
            libelleSpecialite: ''
        }
    });
};

const handleChangeUserId = (e) => {
    setIdUser(e.target.value);
    switch (selectedFormObject) {
        case 'ETUDIANT':
            let selectedStudent = studentsList.find(eleve=>eleve.id_utilisateur === e.target.value);
            setFormData({
                nom: selectedStudent.nom,
                prenom: selectedStudent.prenom,
                email: selectedStudent.adresse_email,
                idRole: 2,
                ancienneFonction: 'ETUDIANT',
                fonction:'ETUDIANT',
                fonctionParameters: {
                    idClasse: selectedStudent.id_classe,
                    libelleSpecialite: ''
                }
            });
            break;
        default:
            let selectedUser = {};
            let idRoleTemp = 0;
            switch (selectedFormObject) {
                case 'INTERVENANT':
                    selectedUser = teachersList.find(user=>user.id_utilisateur === e.target.value);
                    idRoleTemp = 6;
                    break;
                case 'ADMINISTRATEUR':
                    selectedUser = adminsList.find(user=>user.id_utilisateur === e.target.value);
                    idRoleTemp = 1;
                    break;
                case 'ATTACHE_PROMO':
                    selectedUser = apList.find(user=>user.id_utilisateur === e.target.value);
                    idRoleTemp = 3;
                    break;
                case 'RESPONSABLE_PEDA':
                    selectedUser = rpList.find(user=>user.id_utilisateur === e.target.value);
                    idRoleTemp = 4;
                    break;
                case 'REPROGRAPHE':
                    selectedUser = reproList.find(user=>user.id_utilisateur === e.target.value);
                    idRoleTemp = 5;
                    break;
                default:
                    break;
            }
            setFormData({
                nom: selectedUser.nom,
                prenom: selectedUser.prenom,
                email: selectedUser.adresse_email,
                idRole: idRoleTemp,
                ancienneFonction: {selectedFormObject},
                fonction:{selectedFormObject},
                fonctionParameters: {
                    idClasse: '',
                    libelleSpecialite: ''
                }
            });
            break;
    }
  };

  const handleChange = (e) => {
    let newValue = '';
    if (e.target.type === 'number') {
        newValue = e.target.valueAsNumber;
    }  else {
        newValue = e.target.value;
    }
    setFormData((prevData) => ({
              ...prevData,
              [e.target.name]: newValue
            }));
  };

  const handleSubmitChange = (e) => {
    e.preventDefault();
    console.log(idUser, formData);
    userService.changeUser(idUser, formData)
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
        })
        requestStudents();
        requestRepro();
        // requestAdmins();
        requestAp();
        requestRp();
        requestTeachers();
    }

    const handleSubmitDelete = (e) => {
        e.preventDefault();
        console.log(idUser);
        userService.removeUser(idUser)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })
            requestStudents();
            requestRepro();
            if (isAdmin) {
                requestAdmins();
            }
            requestAp();
            requestRp();
            requestTeachers();
            setIdUser('');
            setFormData({
                nom: '',
                prenom: '',
                email: '',
                idRole: '',
                ancienneFonction: '',
                fonction:'',
                fonctionParameters: {
                    idClasse: '',
                    libelleSpecialite: ''
                }
            });
        }

  const renderClassSelect = () => {
    if (selectedFormObject === 'ETUDIANT') {
      return (
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Classe</InputLabel>
          <Select
            label="Classe"
            name="fonctionParameters.idClasse"
            value={formData.fonctionParameters.idClasse}
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

  const renderUserChoice = () => {
    let list = [];
    switch (selectedFormObject) {
        case 'ETUDIANT':
            list = studentsList;
            break;
        case 'INTERVENANT':
            list = teachersList;
            break;
        case 'ADMINISTRATEUR':
            list = adminsList;
            break;
        case 'ATTACHE_PROMO':
            list = apList;
            break;
        case 'RESPONSABLE_PEDA':
            list = rpList;
            break;
        case 'REPROGRAPHE':
            list = reproList;
            break;
        default:
            break;
    }
    return list.map((items) => (
        <MenuItem key={items.id_utilisateur} value={items.id_utilisateur}>
          {items.prenom} {items.nom}
        </MenuItem>
      ))
  }


  return (
    <div className='formEntier'>
     <div className='formCase'>
    <form style={{ marginRight: '60px', marginLeft: '60px', marginTop:'40px'}}>
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel>Fonction</InputLabel>
        <Select
          label='Fonction'
          name="libelle_role"
          value={selectedFormObject}
          onChange={handleChangeObject}
          required
        >
          {roles.map((role) => (
              <MenuItem key={role.libelle_role} value={role.libelle_role}>
                {role.libelle_role.replace(/_/gm, ' ')}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Choisissez l'utilisateur</InputLabel>
          <Select
            label="Choisissez l'utilisateur"
            name="idUser"
            value={idUser}
            onChange={handleChangeUserId}
          >
            {renderUserChoice()}
          </Select>
        </FormControl>  
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Nouveau rôle</InputLabel>
          <Select
            label="Nouveau rôle"
            name="IdRole"
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
      {(selectedFormObject !== '') && (idUser !== '') ? 
        <div><Button type="button" variant="contained" color="primary" style={{marginRight:50}} onClick={handleSubmitChange}>Enregistrer</Button>
        <Button type="button" variant="contained" color="error" style={{marginLeft:50}} onClick={handleSubmitDelete}>Supprimer</Button></div> : null}
    </form>
    </div>
    </div>
  );
};

export default AdminUserChange;
