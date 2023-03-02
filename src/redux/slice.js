import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
};

export const todoList = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setname: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setname } = todoList.actions;

export default todoList.reducer;
