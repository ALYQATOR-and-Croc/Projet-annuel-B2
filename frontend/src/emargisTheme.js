import { createTheme } from '@mui/material/styles';
import { teal } from '@mui/material/colors';

const emargisTheme = createTheme({
    palette: {
      primary: {
        main: teal[500],
      },
      default: {
        main: teal[500],
      },
      text: {
        primary : 'rgba(0, 77, 64, 0.87)',
        secondary : 'rgba(0, 77, 64, 0.6)',
        disabled : 'rgba(0, 77, 64, 0.38)',
      },
    },
    typography: {
      fontFamily: 'Montserrat'
    },
    components: {
      MuiTextField : {
        styleOverrides : {
          root : {
            backgroundColor: '#004d40',
          }
        }
      }
    }
  });

export default emargisTheme;