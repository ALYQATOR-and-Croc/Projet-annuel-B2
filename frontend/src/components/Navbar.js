import * as React from 'react';
import logo from '../assets/logo_emargis_white.png';
import '../styles/Navbar.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { accountService } from '../_services/account.service';

function ResponsiveAppBar(props) {

  let pages = []; 

  switch (props.userType) {
    // A modifier en fonction des pages de chaque profil
    case 'student':
      pages = [{title:'Dashboard', path:'/student/dashboard'}, {title:'Planning', path:'/student/planning'}, {title:'Absences/Retards', path:'/student/absence-delay'}];
      break;
    case 'teacher':
      pages = [{title:'Dashboard', path:'/teacher/dashboard'}, {title:'Planning', path:'/teacher/planning'}, {title:'Emarger', path:'/teacher/register-students'}];
      break;
    case 'ap':
      pages = [{title:'Dashboard', path:'/ap/dashboard'}, {title:'Utilisateur', path:'/ap/user'}, {title:'Education', path:'/ap/educ'}, {title:'Absences/Retards', path:'/ap/absence'}];
      break;
    case 'rp':
      pages = [{title:'Dashboard', path:'/rp/dashboard'}, {title:'Utilisateur', path:'/rp/user'}, {title:'Education', path:'/rp/educ'}, {title:'Absences/Retards', path:'/rp/absence'}];
      break;
    case 'repro':
      pages = [{title:'Dashboard', path:'/repro/dashboard'}, {title:'Education', path:'/repro/educ'}, {title:'Absences/Retards', path:'/repro/absence'}];
      break;
    case 'admin':
      pages = [{title:'Dashboard', path:'/admin/dashboard'}, {title:'Utilisateur', path:'/admin/user'}, {title:'Education', path:'/admin/educ'}, {title:'Infrastructure', path:'/admin/infra'}, {title:'Absences/Retards', path:'/admin/absence'}, {title:'Mots de passe', path:'/admin/change-user-password'}];
      break;
    default:
      pages = [{title:'Planning', path:'/planning'}, {title:'Emarger', path:'/emager'}];
      break;
  }

  const fullname = accountService.getUserFirstname() + ' ' + accountService.getUserLastname().toUpperCase();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className='Navbar'>
      <AppBar position="fixed">
        <Container maxWidth="100%">
          <Toolbar disableGutters>
            <img className="logoEmargis" src={logo} alt="Logo Emargis"/>
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 3,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Copykey',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Emargis
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                    <Typography 
                    textAlign="center" 
                    component={Link} 
                    to={page.path} 
                    color="primary.dark"
                    sx={{ textDecoration: 'none' }}
                    >
                      {page.title}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'Copykey',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Emargis
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.title}
                  href={page.path}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.title}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Typography
                variant="subtitle1"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  fontFamily: 'Montserrat',
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                {fullname}
              </Typography>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircle fontSize='large' sx={{color:"white"}}/>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key="Logout" onClick={() => {
                  accountService.logout();
                  window.location.reload(false);
                  }}>
                  <Typography textAlign="center">Déconnexion</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography 
                  textAlign="center" 
                  component={Link} 
                  color="primary.dark"
                  sx={{ textDecoration: 'none' }}
                  to={`/${props.userType}/change-password`}>Changer le mot de passe</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default ResponsiveAppBar;