import React from 'react';
import { Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { tr } from 'date-fns/locale';
import { Tooltip } from '@mui/material';
import { DatePickerInputProps } from '../types/props';


const DatePickerInput: React.FC<DatePickerInputProps> = ({
  name,
  label,
  control,
  required = false,
  disabled = false,
  tooltip
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={tr}>
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? 'Bu alan zorunludur' : false }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Tooltip title={tooltip || ''} placement="top">
            <DatePicker
              label={label}
              value={value || null}
              onChange={onChange}
              disabled={disabled}
              slotProps={{
                textField: {
                  error: !!error,
                  helperText: error?.message,
                  size: "small",
                  fullWidth: true,
                  margin: "normal"
                },
              }}
              format="dd/MM/yyyy"
            />
          </Tooltip>
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePickerInput;