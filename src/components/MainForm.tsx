import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Checkbox, FormControlLabel, Grid2 as Grid, Paper, Typography } from '@mui/material';
import { Save, Clear } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, updateItem } from '../store/dataSlice';
import { FormData, DataItem, RootState } from '../types/models';
import useToast from '../hooks/useToast';
import CommonInput from './CommonInput';
import DatePickerInput from './DatePickerInput';
import CommonButton from './CommonButton';
import DataGrid from './DataGrid';

const MainForm: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const items = useSelector((state: RootState) => state.data.items);

  const { control, handleSubmit, reset, setValue, watch } = useForm<FormData>({
    defaultValues: {
      code: '',
      name: '',
      assignDate: null,
      isUpdatable: false
    }
  });

  const onSubmit = (data: FormData) => {
    try {
      const formattedData = {
        ...data,
        assignDate: data.assignDate ? data.assignDate.toISOString() : ''
      };

      if (selectedIndex !== null) {
        dispatch(updateItem({ index: selectedIndex, item: formattedData }));
        showToast({ 
          message: 'Data updated successfully', 
          type: 'success' 
        });
      } else {
        dispatch(addItem(formattedData));
        showToast({ 
          message: 'Data added successfully', 
          type: 'success' 
        });
      }
      handleClean();
    } catch (error) {
      showToast({ 
        message: 'An error occurred, please contact support', 
        type: 'error' 
      });
    }
  };

  const handleClean = () => {
    reset({
      code: '',
      name: '',
      assignDate: null,
      isUpdatable: false
    });
    setSelectedIndex(null);
  };

  const handleRowClick = (item: DataItem, index: number) => {
    if (!item.isUpdatable) return;
    
    setValue('code', item.code);
    setValue('name', item.name);
    setValue('assignDate', new Date(item.assignDate));
    setValue('isUpdatable', item.isUpdatable);
    setSelectedIndex(index);
  };
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Form Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {selectedIndex !== null ? 'Update Data' : 'Add Data'}
            </Typography>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ display: 'grid', gap: 2 }}>
                <CommonInput
                  name="code"
                  label="Code"
                  control={control}
                  required
                  maxLength={5}
                  pattern={{
                    value: /^[A-Za-z]{2}[0-9]{3}$/,
                    message: 'The first 2 characters must be letters, and the last 3 must be digits'
                  }}
                  tooltip="The first 2 characters must be letters, and the last 3 must be digits"
                />

                <CommonInput
                  name="name"
                  label="Name"
                  control={control}
                  required
                  maxLength={12}
                />

                <DatePickerInput
                  name="assignDate"
                  label="Assign Date"
                  control={control}
                  required
                  tooltip="Select a date"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={watch('isUpdatable')}
                      onChange={(e) => setValue('isUpdatable', e.target.checked)}
                    />
                  }
                  label="Is Updatable?"
                />

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <CommonButton
                  label={selectedIndex !== null ? 'Update' : 'Save'}
                  onClick={handleSubmit(onSubmit)}
                  startIcon={<Save />}
                  color="primary"
                  variant="contained"
                  tooltip={selectedIndex !== null ? 'Update Record' : 'Add New Record'}
                />

                <CommonButton
                  label="Clean"
                  onClick={handleClean}
                  startIcon={<Clear />}
                  color="secondary"
                  variant="outlined"
                  tooltip="Clear Form"
                />
                </Box>
              </Box>
            </form>
          </Paper>
        </Grid>

        {/* DataGrid Section */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Data List
            </Typography>
            
            <DataGrid 
              data={items} 
              onRowClick={handleRowClick} 
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainForm;