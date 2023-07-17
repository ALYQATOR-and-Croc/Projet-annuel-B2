import React from 'react';
import ApInfraAdd from './ApInfraAdd';
import ApInfraChange from './ApInfraChange';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import { Divider } from '@mui/material';

const ApInfra = () => {
  
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

export default ApInfra;