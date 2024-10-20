import React from 'react';
import { Button, Tooltip } from '@mui/material';
import { CommonButtonProps } from '../types/props';

const CommonButton: React.FC<CommonButtonProps> = ({
  label,
  onClick,
  startIcon,
  color = 'primary',
  disabled = false,
  tooltip,
  variant = 'contained'
}) => {
  return (
    <Tooltip title={tooltip || ''} placement="top">
      <span>
        <Button
          onClick={onClick}
          startIcon={startIcon}
          color={color}
          disabled={disabled}
          variant={variant}
          sx={{ m: 1 }}
        >
          {label}
        </Button>
      </span>
    </Tooltip>
  );
};

export default CommonButton;