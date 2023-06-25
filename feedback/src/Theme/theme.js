import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const font = 'Nunito, sans-serif';

const theme = createTheme({
  palette: {
    background: {
    },
    mode: 'light',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: "#FFFFFF"
    },
  },
  typography: {
    fontFamily: font,
    button: {
      height: 30,
      fontSize: '20px',
      padding: '10px',
      textTransform: 'none',
    }
  },
  root: {
    "& .MuiDataGrid-columnHeaders": {
      fontSize: 17.8,
    },
    "& .MuiDataGrid-row Mui-selected": {
      backgroundColor: "red"
    }
  },
  '@global': {
      '*::-webkit-scrollbar': {
        width: '0px',
        height: '10px',
      },
      '*::-webkit-scrollbar-thumb': {
        width: '0rem',
        backgroundColor: '#D5073C',
        borderRadius: "2rem",
      },
    },
});

export default theme;