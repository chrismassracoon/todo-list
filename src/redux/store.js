import { configureStore } from '@reduxjs/toolkit';
import todolist from './slice';

export const store = configureStore({
  reducer: { todolist },
});
