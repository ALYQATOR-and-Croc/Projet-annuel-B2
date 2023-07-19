import React from 'react';
import ApEducAdd from './AdminEducAdd';
import ApEducChange from './AdminEducChange';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import { Divider } from '@mui/material';

const AdminEduc = () => {
  
  return (
    <div className="AbsenceDelayStudent">
        <div className='absenceDelayGrids'>
          <div className='absences'>
            <h1 className='absencesTitle'>
              <AddIcon className='delaysTitleLogo' fontSize='large'/>
              Ajout du système éducatif
            </h1>
            <ApEducAdd/>
          </div>
          <Divider orientation="vertical" flexItem></Divider>
          <div className='delays'>
          <h1 className='delaysTitle'>
            <SettingsIcon className='delaysTitleLogo' fontSize='large'/>
            Modification du système éducatif
          </h1>
            <ApEducChange/>
          </div>
        </div>
    </div>
  );
};

export default AdminEduc;