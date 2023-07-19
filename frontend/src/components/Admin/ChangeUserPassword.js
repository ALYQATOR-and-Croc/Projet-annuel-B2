import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react'
import { accountService } from '../../_services/account.service';
import { userService } from '../../_services/user.service';
import '../../styles/ChangeMdp.css'

export default function ChangePassword() {
  const [success, setSuccess] = useState(false);
  const [pswdData, setPswdData] = useState({
    idUser: '',
    formerPswd: '',
    newPswd: ''
  });

  const [usersList, setUsersList] = useState([]);
    const requestUsers = () => {
        userService.allUsersList()
            .then(res => {
                console.log(res);
                setUsersList(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    };  
    
    const [getUsers, setGetUsers] = useState(true)
    if (getUsers) {
        requestUsers();
        setGetUsers(false);
    }

  const handleChange = (e) => {
    setPswdData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    accountService.changePassword(pswdData)
        .then(res => {
            setSuccess(true); 
        })
        .catch(error => {
            console.log(error);
        })
  }

  const successAlert = success ? <div className='successAlertAdmin'><Alert className="alertLogin" variant="filled" severity="success" onClose={() => {setSuccess(false)}}>
    Le mot de passe a bien été modifié !</Alert></div> : null;

  return (
    <div className='ChangePassword'>
      <h1 className='absencesTitle'>Changer le mot de passe d'un utilisateur</h1><br></br>
      <form onSubmit={handleSubmit}>
      <div className='chooseUser'><FormControl fullWidth style={{ marginBottom: '20px' }}>
      <InputLabel>Choisissez l'utilisateur</InputLabel>
          <Select
            label="Choisissez l'utilisateur"
            name="idUser"
            value={pswdData.idUser}
            onChange={e => setPswdData({...pswdData, idUser:e.target.value})}
          >
            {usersList.map((items) => (
        <MenuItem key={items.idUser} value={items.idUser}>
          {items.prenomUser} {items.nomUser}
        </MenuItem>
      ))}
          </Select>
          </FormControl></div>
      <TextField
          name="newPswd"
          label="Nouveau mot de passe"
          type="password"
          value={pswdData.newPswd}
          onChange={handleChange}
          style={{ marginRight: '20px', backgroundColor: 'white' }}
          required
        />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: 8 }}>
        Enregistrer
      </Button></form><br></br>
      <div>{successAlert}</div>
    </div>
  )
}
