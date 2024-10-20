import React from 'react';
import { TextField, Tooltip } from '@mui/material';
import { Controller } from 'react-hook-form';
import { CommonInputProps } from '../types/props';

const CommonInput: React.FC<CommonInputProps> = ({
  name,
  label,
  control,
  pattern,
  maxLength,
  required = false,
  disabled = false,
  tooltip,
  type = 'text'
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? 'This field is required' : false,
        pattern: pattern,
        maxLength: {
          value: maxLength || 524288,
          message: `Maksimum ${maxLength} karakter girebilirsiniz`
        }
      }}
      render={({ field, fieldState: { error } }) => (
        <Tooltip title={tooltip || ''} placement="top">
          <TextField
            {...field}
            label={label}
            type={type}
            error={!!error}
            helperText={error?.message}
            disabled={disabled}
            fullWidth
            size="small"
            margin="normal"
          />
        </Tooltip>
      )}
    />
  );
};

export default CommonInput;