import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import allActions from '../actions';

const FIVE_SIZE = 5;
function Login() {
  const { userActions: { setEmaill } } = allActions;
  const [emailForDispatch, setEmailForDispatch] = useState('');
  const [email, setEmail] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [password, setPassword] = useState(false);
  const dispatch = useDispatch();
  function hG({ target: { name, value } }) {
    const regexp = /\S+@\S+\.\S+/;
    if (name === 'email') {
      setEmailForDispatch(value);
      return setEmail(regexp.test(value));
    }
    if (name === 'password') return setPassword(value.length > FIVE_SIZE);
  }
  function handleClick() {
    dispatch(setEmaill(emailForDispatch));
    setShouldRedirect(true);
  }
  return (
    <>
      { shouldRedirect ? <Redirect to="/carteira" /> : false }
      <form>
        <input data-testid="email-input" type="text" name="email" onChange={ hG } />
        <input data-testid="password-input" name="password" type="text" onChange={ hG } />
        <button
          type="button"
          disabled={ !email || !password }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </form>
    </>
  );
}

export default Login;
