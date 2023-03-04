import { useSelector } from 'react-redux';

export function useAuth() {
  const { email, userId, name, token, todoList } = useSelector((state) => state.todolist);

  return {
    todoList,
    isAuth: !!email,
    email,
    id: userId,
    token,
    name,
  };
}
