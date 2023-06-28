import * as React from 'react';
import logo from '../../assets/logo_emargis_white.png';
import '../../styles/Navbar.css';
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

function ResponsiveAppBar() {

  const userType = 'student'; // a remplacer par un appel API

  let pages = []; 

  switch (userType) {
    case 'student':
      pages = [{title:'Planning', path:'/student/planning'}, {title:'Absences/Retards', path:'/student/absences'}, {title:'Emarger', path:'/student/emager'}];
      break;
    // A modifier en fonction des pages de chaque profil
    case 'teacher':
      pages = [{title:'Planning', path:'/planning'}, {title:'Emarger', path:'/emager'}];
      break;
    case 'ap':
      pages = [{title:'Planning', path:'/planning'}, {title:'Emarger', path:'/emager'}];
      break;
    case 'rp':
      pages = [{title:'Planning', path:'/planning'}, {title:'Emarger', path:'/emager'}];
      break;
    default:
      pages = [{title:'Planning', path:'/planning'}, {title:'Emarger', path:'/emager'}];
      break;
  }

const fullname = "Luigi AUBRY-POUGET"; // a remplacer par un appel API
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
    <AppBar position="static">
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
              <MenuItem key="Logout" onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Logout</Typography>
                {/* onClick={account.service.logout} */}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;