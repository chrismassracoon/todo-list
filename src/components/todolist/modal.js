import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AuthModal() {
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

  const [show, setShow] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSwitch = () => setIsRegister(!isRegister);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, username, password)
      .then(() => {
        console.log('User registered successfully');
        handleClose();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // авторизація користувача
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then(() => {
        console.log('User logged in successfully');
        handleClose();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <div onClick={handleShow} className="openModalButton">
        <img
          src="https://cdn-icons-png.flaticon.com/512/402/402976.png?w=826&t=st=1677676679~exp=1677677279~hmac=30c1af1725b6482a8955c6f533e7476f8ccd39957380ee4803d9e957fab4dcf2"
          alt=""
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isRegister ? 'Register' : 'Log In'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group style={{ marginBottom: '20px' }} controlId="formBasicUsername">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                value={username}
                onChange={handleUsernameChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleSwitch}>
            {isRegister ? 'Log In' : 'Register'}
          </Button>

          <Button variant="warning" onClick={isRegister ? handleRegister : handleLogin}>
            {isRegister ? 'Register' : 'Log In'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AuthModal;
