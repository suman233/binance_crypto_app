
import { createTheme } from '@mui/material/styles';

// Light mode theme
const theme = createTheme({
  palette: {
    mode: 'light', 
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f5f0f2',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

// Dark mode theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0a1824',
    },
    secondary: {
      main: '#26181d',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export { theme, darkTheme };
