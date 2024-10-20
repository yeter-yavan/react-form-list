export interface ErrorFallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
  }
  
  export interface ToastMessage {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }