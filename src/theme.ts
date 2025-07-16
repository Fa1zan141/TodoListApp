import { createTheme } from '@mui/material/styles';

const primaryColor = '#F85E5E'; 
const secondaryColor = '#FFB74D'; 
const backgroundColor = '#F9FAFB'; 

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    background: {
      default: backgroundColor,
    },
  },
  typography: {
    fontFamily: " 'Roboto'",
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    body2: {
      color: '#6B7280',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: primaryColor,
          color: '#fff',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          color: '#000',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          color:'white',
          border:'1px solid black',
          outline:'none'
        },
      },
    },
  },
});

export default theme;
