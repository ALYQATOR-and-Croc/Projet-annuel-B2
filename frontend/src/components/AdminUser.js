import React from 'react';
import ApUserAdd from './AdminUserAdd';
import ApUserChange from './AdminUserChange';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import { Divider } from '@mui/material';

const AdminUser = () => {
  
  return (
    <div className="AbsenceDelayStudent">
        <div className='absenceDelayGrids'>
          <div className='absences'>
            <h1 className='absencesTitle'>
              <AddIcon className='delaysTitleLogo' fontSize='large'/>
              Ajout d'un utilisateur
            </h1>
            <ApUserAdd/>
          </div>
          <Divider orientation="vertical" flexItem></Divider>
          <div className='delays'>
          <h1 className='delaysTitle'>
            <SettingsIcon className='delaysTitleLogo' fontSize='large'/>
            Modification d'un utilisateur
          </h1>
            <ApUserChange/>
          </div>
        </div>
    </div>
  );
};

export default AdminUser;