import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataState, DataItem } from '../types/models';

const initialState: DataState = {
  items: []
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<DataItem>) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<{ index: number; item: DataItem }>) => {
      const { index, item } = action.payload;
      state.items[index] = item;
    }
  }
});

export const { addItem, updateItem } = dataSlice.actions;
export default dataSlice.reducer;