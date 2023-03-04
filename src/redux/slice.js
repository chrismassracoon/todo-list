import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todoList: [],
  email: null,
  userId: null,
  name: '',
  token: null,
};

export const todoList = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addUser(state, action) {
      state.email = action.payload.email;
      state.userId = action.payload.id;
      state.token = action.payload.accessToken;
    },
    removeUser(state) {
      state.email = null;
      state.userId = null;
      state.token = null;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setTodoList(state, action) {
      state.todoList = action.payload;
    },
  },
});

export const { setName, addUser, removeUser, setTodoList } = todoList.actions;

export default todoList.reducer;
