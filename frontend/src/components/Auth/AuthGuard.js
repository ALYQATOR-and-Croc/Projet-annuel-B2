import React from 'react'
import { Navigate } from 'react-router-dom';
import { accountService } from './account.service';

export default function AuthGuard({children}) {

    if (!accountService.isLogged()) {
        return <Navigate to="/login"/>
    }
  
    return children;
}
