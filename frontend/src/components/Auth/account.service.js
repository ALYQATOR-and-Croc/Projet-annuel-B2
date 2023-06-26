// modules de gestion du token d'authentification utilisateur

let saveToken = (token) => {
    localStorage.setItem('AuthToken', token)
}

let logout = () => {
    localStorage.removeItem('AuthToken')
}

let isLogged = () => {
    let token = localStorage.getItem('AuthToken');
    return !!token
}

export const accountService = {
    saveToken, logout, isLogged
}