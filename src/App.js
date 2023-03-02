import './mainStyles.scss';
import Data from './components/Date';
import TodoList from './components/todolist/TodoList';
import AuthModal from './components/todolist/Modal';
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
