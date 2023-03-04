import './mainStyles.scss';
import Data from './components/Data';
import TodoList from './components/todolist/todoList';
import AuthModal from './components/todolist/modal';
import { useEffect, useState } from 'react';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux/es/exports';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { addUser, setTodoList, setName } from './redux/slice';
import { useAuth } from './hooks/useAuth';

function App() {
  const dispatch = useDispatch();
  const firebaseConfig = {
    apiKey: 'AIzaSyCrpy8eOiEsHT4pyh1-lvyEMI8K4-ABwDM',
    authDomain: 'todo-list-31a9e.firebaseapp.com',
    projectId: 'todo-list-31a9e',
    storageBucket: 'todo-list-31a9e.appspot.com',
    messagingSenderId: '376068492917',
    appId: '1:376068492917:web:ba620f61482afa17f2723c',
    measurementId: 'G-TPWGLDQEZB',
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const todolistRef = collection(db, 'todolist');
  const { email, todoList, id, name } = useAuth();
  useEffect(() => {
    auth.onAuthStateChanged((user) =>
      dispatch(addUser({ email: user?.email, accessToken: user?.accessToken, id: user?.uid })),
    );
  }, []);
  useEffect(() => {
    if (email) {
      const getTodoList = async (email) => {
        try {
          const todoDoc = await getDoc(doc(todolistRef, email));
          if (todoDoc.exists()) {
            const todoListData = todoDoc.data();
            console.log('Дані успішно отримані з Firestore: ', todoListData);
            dispatch(setName(todoListData.name));
            dispatch(setTodoList(todoListData.todo));
          } else {
            console.log('Документ не знайдено в Firestore');
          }
        } catch (error) {
          console.error('Помилка отримання даних з Firestore: ', error);
        }
      };
      getTodoList(email);
    }
  }, [email]);
  useEffect(() => {
    if (email) {
      setDoc(doc(todolistRef, email), { name: name, todo: todoList });
    }
  }, [todoList, name]);
  return (
    <div className="main">
      <Data></Data>
      <AuthModal auth={auth} app={app}></AuthModal>
      <TodoList></TodoList>
      <svg className="todo_arrow_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160zm160 352l-160-160c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 329.4 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z" />
      </svg>
    </div>
  );
}

export default App;
