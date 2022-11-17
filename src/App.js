import './mainStyles.scss'
import Data from './components/date';
import TodoList from './components/todolist/todoList';

function App() {
	return (
		<div className='main'>
		<Data></Data>
		<TodoList></TodoList>
		</div>
	)
}

export default App;
