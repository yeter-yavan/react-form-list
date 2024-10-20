import { useSnackbar } from 'notistack';
import { ToastMessage } from '../types/error';

const useToast = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showToast = ({ message, type }: ToastMessage) => {
    enqueueSnackbar(message, {
      variant: type,
      anchorOrigin: { 
        vertical: 'top', 
        horizontal: 'right' 
      },
      autoHideDuration: 3000
    });
  };

  return { showToast };
};

export default useToast;