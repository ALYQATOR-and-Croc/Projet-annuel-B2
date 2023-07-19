import React from 'react';
import ApInfraAdd from './AdminInfraAdd';
import ApInfraChange from './AdminInfraChange';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import { Divider } from '@mui/material';

const AdminInfra = () => {
  
  return (
    <div className="AbsenceDelayStudent">
        <div className='absenceDelayGrids'>
          <div className='absences'>
            <h1 className='absencesTitle'>
              <AddIcon className='delaysTitleLogo' fontSize='large'/>
              Ajout dans l'infrastructure
            </h1>
            <ApInfraAdd/>
          </div>
          <Divider orientation="vertical" flexItem></Divider>
          <div className='delays'>
          <h1 className='delaysTitle'>
            <SettingsIcon className='delaysTitleLogo' fontSize='large'/>
            Modification dans l'infrastructure
          </h1>
            <ApInfraChange/>
          </div>
        </div>
    </div>
  );
};

export default AdminInfra;