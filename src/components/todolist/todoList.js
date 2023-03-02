import { useState } from 'react';
import './todoListStyle.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CloseButton, ListGroup, ListGroupItem } from 'react-bootstrap';
import trashbin from '../../img/trashbin.png';
import complite from '../../img/complite.svg';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [visible, setVisible] = useState(false);
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.todos__container') && !e.target.closest('.showTodo')) {
      setVisible(false);
    }
  });
  const content = (
    <View setVisible={setVisible} visible={visible} todoList={todoList} setTodoList={setTodoList} />
  );
  return (
    <div>
      {content}
      <button onClick={() => setVisible(!visible)} className="showTodo">
        Todoes?
      </button>
    </div>
  );
};
const View = (props) => {
  let temp;
  const changeTodo = (e) => {
    e.preventDefault();
    if (temp.length < 2) {
    }
    props.setTodoList([...props.todoList, { text: temp, complete: false }]);
    e.target.previousElementSibling.value = '';
  };

  const makeComplie = (e) => {
    const id = e.target.parentNode.id;
    console.log(e.target.parentNode);
    console.log(id);
    const newArr = props.todoList.map((item, i) => {
      if (i == id) {
        return { text: item.text, complete: !item.complete };
      } else {
        return item;
      }
    });
    props.setTodoList(newArr);
  };
  const spectInput = (e) => {
    e.preventDefault();
    temp = e.target.value;
  };

  const deleteItem = (e) => {
    const id = e.target.parentNode.id;
    const newTodo = props.todoList.filter((item, i) => i != id);
    props.setTodoList(newTodo);
    console.log(e.target.parentNode);
  };
  const items = props.todoList.map((item, i) => {
    return (
      <CSSTransition classNames={'todo'} key={item.text} timeout={300}>
        <ListGroupItem
          className={item.complete ? 'todo__item complited' : `todo__item`}
          style={{
            position: 'relavtive',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {i + 1}. {item.text}{' '}
          <div>
            <button
              id={i}
              onClick={makeComplie}
              style={{ background: 'none' }}
              className="deleteButton">
              <img src={complite} />
            </button>
            <button
              onClick={deleteItem}
              id={i}
              style={{ background: 'none' }}
              className="deleteButton">
              <img className="trshabin" src={trashbin} />
            </button>
          </div>
        </ListGroupItem>
      </CSSTransition>
    );
  });
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.visible}
      classNames={'todos__container'}
      timeout={350}>
      <div style={{ minHeight: '450px' }} className="todos__container">
        <CloseButton
          onClick={() => props.setVisible(!props.visible)}
          variant="white"
          style={{ position: 'absolute', right: '20px', top: '20px' }}></CloseButton>
        <div className="todoes">
          <TransitionGroup component={ListGroup}>{items}</TransitionGroup>
        </div>
        <div className="todo__add__form">
          <form>
            <input
              value={temp}
              onChange={temp?.length < 2 ? null : spectInput}
              placeholder="type todo"
              type="text"
            />
            <button onClick={changeTodo}>+</button>
          </form>
        </div>
      </div>
    </CSSTransition>
  );
};

export default TodoList;
