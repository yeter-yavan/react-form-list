import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { tr } from 'date-fns/locale';
import { ErrorBoundary } from 'react-error-boundary';
import { SnackbarProvider } from 'notistack';
import MainForm from './components/MainForm';
import ErrorFallback from './components/ErrorFallback';

// Material UI style
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    // Snackbar (Toast) style
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiSnackbarContent-root': {
            fontSize: '0.875rem',
          },
        },
      },
    },
  },
});

const App: React.FC = () => {
  const handleError = (error: Error) => {
    console.error('Application Error:', error);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider 
          maxSnack={3} 
          anchorOrigin={{ 
            vertical: 'top', 
            horizontal: 'right' 
          }}
        >
          <ErrorBoundary 
            FallbackComponent={ErrorFallback}
            onError={handleError}
            onReset={() => window.location.reload()}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={tr}>
              <CssBaseline />
              <Container maxWidth="lg" sx={{ py: 4 }}>
                <MainForm />
              </Container>
            </LocalizationProvider>
          </ErrorBoundary>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;