import { useState, useEffect } from 'react';
import './todoListStyle.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CloseButton, ListGroup, ListGroupItem } from 'react-bootstrap';
import trashbin from '../../img/trashbin.png';
import complite from '../../img/complite.svg';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { setTodoList } from '../../redux/slice';

const TodoList = () => {
  const { todoList } = useAuth();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const todosContainer = document.querySelector('.todos__container');

  function hideTodo(e) {
    if (!e.target.closest('.todos__container') && !e.target.closest('.showTodo')) {
      setVisible(false);
    }
  }
  useEffect(() => {
    document.addEventListener('click', hideTodo);
    return () => {
      document.removeEventListener('click', hideTodo);
    };
  }, []);

  let startYHide;
  let startY = null; // тимчасова координата
  const threshold = 50; // поріг для свайпу
  // відстежуємо подію свайпу
  // Закриття туду по свайпу вниз(неможливо скролити, поки вимкн)
  //   document.addEventListener('touchstart', function (e) {
  //     if (e.target.closest('.todos__container')) {
  //       startYHide = e.touches[0].clientY;
  //     }
  //   });
  //   document.addEventListener('touchmove', function (e) {
  //     if (e.target.closest('.todos__container')) {
  //       const distance = e.touches[0].clientY - startYHide;
  //       if (distance > 50) {
  //         setVisible(false);
  //       }
  //     }
  //   });

  document.addEventListener('touchstart', function (e) {
    const touch = e.touches[0];
    startY = touch.pageY;
  });

  document.addEventListener('touchmove', function (e) {
    if (startY) {
      const touch = e.touches[0];
      const diff = touch.pageY - startY;

      if (diff < -threshold) {
        setVisible(true);
        startY = null;
      }
    }
  });

  document.addEventListener('touchend', function (e) {
    startY = null;
  });

  const content = <View setVisible={setVisible} visible={visible} />;
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
  const { todoList } = useAuth();
  const dispatch = useDispatch();
  let temp;
  // Додавання нового пункту
  const changeTodo = (e) => {
    e.preventDefault();
    if (temp.length < 2) {
    }
    dispatch(setTodoList([...todoList, { text: temp, complete: false }]));
    e.target.previousElementSibling.value = '';
  };

  // Виконання пунктів листу
  const makeComplie = (e) => {
    const id = e.target.parentNode.id;
    const newArr = todoList.map((item, i) => {
      if (i == id) {
        return { text: item.text, complete: !item.complete };
      } else {
        return item;
      }
    });
    dispatch(setTodoList(newArr));
  };

  // Слідкування зміни інпуту
  const spectInput = (e) => {
    e.preventDefault();
    temp = e.target.value;
  };

  // Видалення завдання
  const deleteItem = (e) => {
    const id = e.target.parentNode.id;
    const newTodo = todoList.filter((item, i) => i != id);
    dispatch(setTodoList(newTodo));
    console.log(e.target.parentNode);
  };
  const items = todoList.map((item, i) => {
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
          <div className="buttons-container">
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
          <form className="add_form">
            <input
              value={temp}
              onChange={temp?.length < 2 ? null : spectInput}
              placeholder="type todo"
              type="text"
            />
            <button style={{ width: '25px' }} onClick={changeTodo}>
              +
            </button>
          </form>
        </div>
      </div>
    </CSSTransition>
  );
};

export default TodoList;
