import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import allActions from '../actions';

function Login() {
  const { userActions: { setEmaill } } = allActions;
  const [emailForDispatch, setEmailForDispatch] = useState('');
  const [email, setEmail] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [password, setPassword] = useState(false);
  const dispatch = useDispatch();
  function handleOnChange({ target: { name, value } }) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name === 'email') {
      setEmailForDispatch(value);
      return setEmail(regexp.test(value));
    }
    if (name === 'password') return setPassword(value.length > 5);
  }
  function handleClick() {
    dispatch(setEmaill(emailForDispatch));
    setShouldRedirect(true);
  }

  return (
    <>
      { shouldRedirect ? <Redirect to="/carteira" /> : false }
      <form>
        <input data-testid="email-input" type="text" name="email" onChange={ handleOnChange } />
        <input data-testid="password-input" name="password" type="text" onChange={ handleOnChange } />
        <button type="button" disabled={ !email || !password } onClick={ handleClick }>Entrar</button>
      </form>
    </>
  );
}

export default Login;
