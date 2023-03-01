import './mainStyles.scss';
import Data from './components/date';
import TodoList from './components/todolist/todoList';
import AuthModal from './components/todolist/modal';

function App() {
  return (
    <div className="main">
      <Data></Data>
		<AuthModal></AuthModal>
      <TodoList></TodoList>
    </div>
  );
}

export default App;
