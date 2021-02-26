import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import currentUser from '../actions';
import Email from '../components/Email';
import LoginButton from '../components/LoginButton';
import Password from '../components/Password';
import trybeLogo from './Trybe_logo-baixa.png';

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const validEmail = /\S+@\S+\.\S+/;
  const PASSWORD_MIN_LENGTH = 6;

  function validateEmail(e) {
    setEmail(e.target.value);
    const isValidEmail = validEmail.test(e.target.value);
    if (isValidEmail && password.length >= PASSWORD_MIN_LENGTH) {
      return setDisableButton(false);
    }
    return setDisableButton(true);
  }

  function validatePassword(e) {
    setPassword(e.target.value);
    const isValidEmail = validEmail.test(email);
    if (isValidEmail && e.target.value.length >= PASSWORD_MIN_LENGTH) {
      return setDisableButton(false);
    }
    return setDisableButton(true);
  }

  function login() {
    dispatch(currentUser({ email, password }));
    setRedirect(true);
  }

  if (redirect) {
    return <Redirect to="/carteira" />;
  }

  return (
    <main className="container-sm w-50 mt-5">

      <div className="d-flex w-100 justify-content-center">
        <img src={ trybeLogo } alt="TrybeLogo" width="50%" />
      </div>
      <div className="d-flex input-group mb-0 container-fluid flex-column">
        <Email validateEmail={ validateEmail } />
        <Password validatePassword={ validatePassword } />
        <LoginButton login={ login } disableButton={ disableButton } />
      </div>
    </main>
  );
}

export default Login;
