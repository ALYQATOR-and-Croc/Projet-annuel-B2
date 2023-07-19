import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { accountService } from '../_services/account.service';
import '../styles/ChangeMdp.css'

export default function ChangePassword(props) {
  const [success, setSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState({
    newPassword: '',
    newPasswordConfirm: ''
  });

  const handleChange = (e) => {
    setNewPassword((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // accountService.changePassword(props.idUser, newPassword)
    //     .then(res => {
    //         console.log(res);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })
    
    //temp
    if (newPassword.newPassword !== '' && newPassword.newPasswordConfirm !== '') {
      setSuccess(true); 
    }
  }

  const successAlert = success ? <div className='successAlert'><Alert className="alertLogin" variant="filled" severity="success" onClose={() => {setSuccess(false)}}>
    Le mot de passe a bien été modifié !</Alert></div> : null;

  return (
    <div className='ChangePassword'>
      <h1 className='absencesTitle'>Saisissez un nouveau mot de passe</h1><br></br>
      <form onSubmit={handleSubmit}>
      <TextField
          name="newPassword"
          label="Nouveau mot de passe"
          type="password"
          value={newPassword.newPassword}
          onChange={handleChange}
          style={{ marginRight: '20px', backgroundColor: 'white' }}
          required
        />
      <TextField
          name="newPasswordConfirm"
          label="Confirmation"
          type="password"
          value={newPassword.newPasswordConfirm}
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
