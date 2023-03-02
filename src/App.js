import './mainStyles.scss';
import Data from './components/Data';
import TodoList from './components/todolist/todoList';
import AuthModal from './components/todolist/modal';
import SuccessfulRegistrationModal from './components/todolist/Succesfullmodal';

function App() {
  return (
    <div className="main">
      {/* <SuccessfulRegistrationModal></SuccessfulRegistrationModal> */}
      <Data></Data>
      <AuthModal></AuthModal>
      <TodoList></TodoList>
    </div>
  );
}

export default App;
