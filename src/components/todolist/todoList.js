import { useEffect, useState } from "react"
import './todoListStyle.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CloseButton, ListGroup, ListGroupItem } from "react-bootstrap";
import Collapse from 'react-bootstrap/Collapse';
import trashbin from '../../img/trashbin.png'
import complite from '../../img/complite.svg'
import { TransitionGroup } from "react-transition-group";
import { CSSTransition } from "react-transition-group";




const TodoList = () => {
	const storage = localStorage.getItem('todoList').split(',');
	const [todoList, setTodoList] = useState(storage.length > 0 && storage != "" ? storage : []);
	const [visible, setVisible] = useState(false);
	const content = <View setVisible={setVisible} visible={visible} todoList={todoList} setTodoList={setTodoList} />;
	return (
		<div>
			{content}
			<button onClick={() => setVisible(!visible)} className="showTodo">Todoes?</button>
		</div>
	)
}
const View = (props) => {
	let temp;
	const changeTodo = (e) => {
		e.preventDefault();
		if (temp.length < 2) {

		}
		props.setTodoList([...props.todoList, temp]);
		e.target.previousElementSibling.value = '';
	}

	const makeComplie = (e) => {
		e.target.closest('.todo__item').classList.toggle('complited');
	}
	const spectInput = (e) => {
		e.preventDefault();
		temp = e.target.value;
	}
	useEffect(() => (localStorage.setItem('todoList', [...props.todoList])), [props.todoList]);

	const deleteItem = (e) => {
		const id = e.target.parentNode.id;
		const newTodo = props.todoList.filter((item, i) => i != id);
		props.setTodoList(newTodo);
	}
	const items = props.todoList.map((item, i) => {
		return <CSSTransition classNames={'todo'} key={item} timeout={300}><ListGroupItem className="todo__item" style={{ position: 'relavtive', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>{i + 1}. {item} <div><button onClick={makeComplie} style={{ background: 'none' }} className="deleteButton"  ><img src={complite} /></button><button onClick={deleteItem} id={i} style={{ background: 'none' }} className="deleteButton"  ><img className="trshabin" src={trashbin} /></button></div></ListGroupItem></CSSTransition>
	})
	return (
		<CSSTransition mountOnEnter  unmountOnExit  in={props.visible} classNames={'todos__container'} timeout={350}>
			<div style={{ minHeight: '450px' }} className="todos__container">
				<CloseButton onClick={() => props.setVisible(!props.visible)} variant="white" style={{ position: 'absolute', right: '20px', top: '20px' }}></CloseButton>
				<div className="todoes" >
					<TransitionGroup component={ListGroup}>
						{items}
					</TransitionGroup>
				</div>
				<div className="todo__add__form">
					<form><input value={temp} onChange={temp?.length < 2 ? null : spectInput} placeholder="type todo" type="text" />
						<button onClick={changeTodo}>+</button>
					</form>
				</div>
			</div>
		</CSSTransition>
	)
}

export default TodoList;
