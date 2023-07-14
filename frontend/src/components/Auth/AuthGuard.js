import React from 'react'
import { Navigate } from 'react-router-dom';
import { accountService } from '../../_services/account.service';

export default function AuthGuard({guardType,children}) {

    if (!accountService.isLogged() || accountService.getUserRole() !== guardType) {
        return <Navigate to="/login"/>
    }
    return children;
}
