import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Checkbox, FormControlLabel, Paper, Typography } from '@mui/material';
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
          message: 'Kayıt başarıyla güncellendi', 
          type: 'success' 
        });
      } else {
        dispatch(addItem(formattedData));
        showToast({ 
          message: 'Yeni kayıt başarıyla eklendi', 
          type: 'success' 
        });
      }
      handleClean();
    } catch (error) {
      showToast({ 
        message: 'İşlem sırasında bir hata oluştu', 
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
    <Box>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Veri Giriş Formu
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
                message: 'İlk 2 karakter harf, son 3 karakter rakam olmalıdır'
              }}
              tooltip="İlk 2 karakter harf, son 3 karakter rakam olmalıdır"
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
              tooltip="Tarih seçiniz"
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
                tooltip={selectedIndex !== null ? 'Kaydı Güncelle' : 'Yeni Kayıt Ekle'}
              />

              <CommonButton
                label="Clean"
                onClick={handleClean}
                startIcon={<Clear />}
                color="secondary"
                variant="outlined"
                tooltip="Formu Temizle"
              />
            </Box>
          </Box>
        </form>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Kayıt Listesi
        </Typography>
        
        <DataGrid 
          data={items} 
          onRowClick={handleRowClick} 
        />
      </Paper>
    </Box>
  );
};

export default MainForm;