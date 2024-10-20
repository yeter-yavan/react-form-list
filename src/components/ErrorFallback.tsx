import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { ErrorFallbackProps } from '../types/error';
import { RefreshRounded } from '@mui/icons-material';

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 2,
          textAlign: 'center'
        }}
      >
        <Typography variant="h4" color="error" gutterBottom>
          Oops! There is something wrong
        </Typography>
        
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {error.message}
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          onClick={resetErrorBoundary}
          startIcon={<RefreshRounded />}
        >
          Retry again
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorFallback;