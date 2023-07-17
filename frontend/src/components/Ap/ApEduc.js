import React, { useState } from 'react';
import { MenuItem, Select, TextField, Button, InputLabel, FormControl } from '@mui/material';

const ApEduc = () => {
  const [formData, setFormData] = useState({
    libelleCreation: '',
    creation: [
      { id: 1, nom: 'Promotion' },
      { id: 2, nom: 'Matière' },
      { id: 3, nom: 'Classe' },
      { id: 4, nom: 'Cours' },
    ],
    libelleMatiere: '',
    idEcole: '',
    idEcoleName : [
        { id: 1, nom: 'ESGI-LYON' },
        { id: 2, nom: 'ESGI-PARIS' },
        { id: 3, nom: 'ESGI-MONTPELLIER' },
      ],
    idIntervenant: '',
    idIntervenantName : [
        { id: 1, nom: 'MR BONNETON' },
        { id: 2, nom: 'MR BONCHE' },
        { id: 3, nom: 'MR COTE' },
      ],
    libelleClasse: '',
    idPromotion: '',
    idPromotionName : [
        { id: 1, nom: 'PROMO ESGI' },
        { id: 2, nom: 'PROMO ICAN' },
        { id: 3, nom: 'PROMO COMMERCE' },
    ],
    idCampus: '',
    idCampusName: [
        { id: 1, nom: 'Science-U Lyon' },
        { id: 2, nom: 'Science-U Paris' },
        { id: 3, nom: 'Science-U Montpellier' },
    ],
    libellePromotion: '',
    anneePromotion: '',
    domainePromotion: '',
    specialitePromotion: '',
    diplomePromotion: '',
    niveauEtude: '',

    courseLabel: '',
    courseDate: '',
    startCourse: '',
    endCourse: '',
    //idTeacher = idIntervenant,
    idRespPedago: '',
    idRespPedagoName: [
        { id: 1, nom: 'Jodie' },
        { id: 2, nom: 'Jonathan' },
        { id: 3, nom: 'Philippe' },
    ],
    idAttachePromotion: '',
    idAttachePromotionName: [
        { id: 1, nom: 'Hugue AP 1' },
        { id: 2, nom: 'Sylvie AP 2' },
        { id: 3, nom: 'Patrick AP 3' },
    ],
    idReprographe: '',
    idReprographeName: [
        { id: 1, nom: 'Bernard REPRO 1' },
        { id: 2, nom: 'Pascale REPRO 2' },
        { id: 3, nom: 'Ludivine REPRO 3' },
    ],
    idClassRoom: '',
    idClassRoomName: [
        { id: 1, nom: '205' },
        { id: 2, nom: '307' },
        { id: 3, nom: '511' },
    ],
    idCourseSubject: '',
    idCourseSubjectName: [
        { id: 1, nom: 'Mathématique' },
        { id: 2, nom: 'Anglais' },
        { id: 3, nom: 'Algo' },
    ],
    idClass: '',
    idClassName: [
        { id: 1, nom: 'B2 ESGI' },
        { id: 2, nom: 'B3 ESGI' },
        { id: 3, nom: 'B1 ESGI' },
    ]
  });

  const handleChange = (event) => {
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [e.target.name]: e.target.value,
    // }));
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Vous pouvez utiliser les données ici ou les envoyer à votre backend
  };

const Classe = () => {
  if (formData.libelleCreation === 'Classe') {
    return (
      <div>
        <TextField
          label="Libellé Classe"
          name="libelleClasse"
          value={formData.libelleClasse}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
        />

        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>ID Promotion</InputLabel>
          <Select
            name="idPromotion"
            value={formData.idPromotion}
            onChange={handleChange}
            required
          >
            {formData.idPromotionName.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.nom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>ID Campus</InputLabel>
          <Select
            name="idCampus"
            value={formData.idCampus}
            onChange={handleChange}
            required
          >
            {formData.idCampusName.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.nom}
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
      if (formData.libelleCreation === 'Matière') {
        return (
          <div>
            <TextField
          label="Libellé Matière"
          name="libelleMatiere"
          value={formData.libelleMatiere}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
        />

        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>ID Ecole</InputLabel>
          <Select
            name="idEcole"
            value={formData.idEcole}
            onChange={handleChange}
            required
          >
            {formData.idEcoleName.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.nom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>ID Intervenant</InputLabel>
          <Select
            name="idIntervenant"
            value={formData.idIntervenant}
            onChange={handleChange}
            required
          >
            {formData.idIntervenantName.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.nom}
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
    if (formData.libelleCreation === 'Promotion') {
      return (
        <div>
            <TextField
          label="Libellé Promotion"
          name="libellePromotion"
          value={formData.libellePromotion}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
        />

        <TextField
          label="Année Promotion"
          name="anneePromotion"
          type="date"
          value={formData.anneePromotion}
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
          value={formData.domainePromotion}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
        />

        <TextField
          label="Spécialité Promotion"
          name="specialitePromotion"
          value={formData.specialitePromotion}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
        />

        <TextField
          label="Diplôme Promotion"
          name="diplomePromotion"
          value={formData.diplomePromotion}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
        />

        <TextField
          label="Niveau d'Étude"
          name="niveauEtude"
          value={formData.niveauEtude}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
        />

<FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>ID Ecole</InputLabel>
          <Select
            name="idEcole"
            value={formData.idEcole}
            onChange={handleChange}
            required
          >
            {formData.idEcoleName.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.nom}
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
    if (formData.libelleCreation === 'Cours') {
      return (
        <div>
            <TextField
          label="Libellé du cours"
          name="courseLabel"
          value={formData.courseLabel}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginBottom: '20px', backgroundColor: 'white' }}
        />

        <TextField
          label="Date du cours"
          name="courseDate"
          type="date"
          value={formData.courseDate}
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
          name="startCourse"
          type="time"
          value={formData.startCourse}
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
          name="endCourse"
          type="time"
          value={formData.endCourse}
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
          <InputLabel>Responsable pédagogique</InputLabel>
          <Select
            name="idRespPedago"
            value={formData.idRespPedago}
            onChange={handleChange}
            required
          >
            {formData.idRespPedagoName.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.nom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Attaché à la promotion</InputLabel>
          <Select
            name="idAttachePromotion"
            value={formData.idAttachePromotion}
            onChange={handleChange}
            required
          >
            {formData.idAttachePromotionName.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.nom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Reprographe</InputLabel>
          <Select
            name="idReprographe"
            value={formData.idReprographe}
            onChange={handleChange}
            required
          >
            {formData.idReprographeName.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.nom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Salle de classe</InputLabel>
          <Select
            name="idClassRoom"
            value={formData.idClassRoom}
            onChange={handleChange}
            required
          >
            {formData.idClassRoomName.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.nom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Matière du cours</InputLabel>
          <Select
            name="idCourseSubject"
            value={formData.idCourseSubject}
            onChange={handleChange}
            required
          >
            {formData.idCourseSubjectName.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.nom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Classe</InputLabel>
          <Select
            name="idClass"
            value={formData.idClass}
            onChange={handleChange}
            required
          >
            {formData.idClassName.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.nom}
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
         <h1 className='titre'>Formulaire d'ajout niveau éducation:</h1>
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