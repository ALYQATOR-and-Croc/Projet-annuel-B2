import React from 'react';
import RegisterTable from '../RegisterTable';
import '../../styles/RegisterStudents.css';
import { Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

export default function RegisterStudents() {
  const date = '18/02/2023';
  const heureDebut = '8h';
  const heureFin = '9h30';
  const matiere = 'Algorithmie'

  const sendRegister = () => {
    console.log("emargement terminé");
  }

  return (
    <div className="RegisterStudents">
      <div className="titreEmargement">
        <h1>Appel du {date}</h1>
        <h2>{heureDebut}-{heureFin} : {matiere}</h2>
      </div>
      <h4 className="soustitreEmargement">Selectionnez les élèves présents et cliquez sur "Confirmer".</h4>
      <div className="RegisterTable"><RegisterTable/></div>
      <Button variant="contained" endIcon={<CheckIcon/>} onClick={sendRegister}>Confirmer</Button>
    </div>
  )
}
