import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#dc004e', // Rojo secundario
      dark: '#9a0036', // Rojo oscuro (opcional)
      light: '#ff5c7a', // Rojo claro (opcional)
     
    },
    secondary: {
      main: '#1976d2', // Azul primario
      dark: '#004ba0', // Azul oscuro (opcional)
      light: '#63a4ff', // Azul claro (opcional)
    },
    background: {
      default: '#f5f5f5', // Fondo de la aplicación
      paper: '#ffffff', // Fondo de las tarjetas y elementos de papel
    },
    text: {
      primary: '#333333', // Texto principal (negro)
      secondary: '#666666', // Texto secundario (gris)
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Fuente predeterminada
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: '1.5',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: '1.4',
    },
    button: {
      fontSize: '1rem',
      textTransform: 'none',
    },
  },
/*   components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#ff5c7a', // Color de fondo en hover
            color: '#ffffff', // Color del texto en hover
          },
        },
      },
    },
  }, */
});

export default theme;
