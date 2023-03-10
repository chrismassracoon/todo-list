import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../mainStyles.scss';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch } from 'react-redux/es/exports';
import { removeUser } from '../../redux/slice';
import SuccessModal from './Succesfullmodal';
function AuthModal({ auth}) {
  const dispatch = useDispatch();
  const { email } = useAuth();
  // Налаштування і ініціалізація firebase та firestore
  //   const db = getFirestore(app);
  //   const todolistRef = collection(db, 'todolist');
  // Cтан реєстрації та модальних вікон
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visibleSucces, setVisibleSucces] = useState([false, { reg: false }]);

  //   setDoc(doc(todolistRef, 'user123'), {
  //     name: 'San Francisco',
  //     regions: ['west_coast', 'da'],
  //   });

  // Функціїї зміни стану
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSwitch = () => setIsRegister(!isRegister);
  const handleUsernameChange = (e) => {
    if (error) {
      setError(false);
    }
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    if (error) {
      setError(false);
    }
    setPassword(e.target.value);
  };
  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, username, password)
      .then(() => {
        console.log('User registered successfully');
        handleClose();
        setTimeout(() => {
          setVisibleSucces([true, { reg: true }]);
        }, 500);
        setTimeout(() => {
          setVisibleSucces([false, { reg: true }]);
        }, 2000);
      })
      .catch((error) => {
        console.log(error.message);
        setError(true);
      });
  };

  const handleOut = () => {
    dispatch(removeUser());
    auth.signOut();
  };
  // авторизація користувача
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then(() => {
        console.log('User logged in successfully');
        handleClose();
        setTimeout(() => {
          setVisibleSucces([true, { reg: false }]);
        }, 500);
        setTimeout(() => {
          setVisibleSucces([false, { reg: false }]);
        }, 2000);
      })
      .catch((error) => {
        console.log(error.message);
        setError(true);
      });
  };

  return (
    <>
      <div className="openModalButton">
        <img
          onClick={handleShow}
          src="https://cdn-icons-png.flaticon.com/512/402/402976.png?w=826&t=st=1677676679~exp=1677677279~hmac=30c1af1725b6482a8955c6f533e7476f8ccd39957380ee4803d9e957fab4dcf2"
          alt=""
        />
        {email && (
          <div className="logout">
            <p className="auth_email">{email}</p>
            <svg onClick={handleOut} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
            </svg>
          </div>
        )}
      </div>

      <SuccessModal visible={visibleSucces[0]} reg={visibleSucces[1].reg} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isRegister ? 'Sign Up' : 'Log In'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group style={{ marginBottom: '20px' }} controlId="formBasicUsername">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className={error && 'error'}
                type="text"
                placeholder="Enter email"
                value={username}
                onChange={handleUsernameChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className={error && 'error'}
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>
          </Form>
          {error && <p className="error_message">Wrong email or password, try again</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSwitch}>
            {isRegister ? 'Switch to Login' : 'Switch to Sign Up'}
          </Button>

          <Button variant="warning" onClick={isRegister ? handleRegister : handleLogin}>
            {isRegister ? 'Sign Up' : 'Log In'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AuthModal;
