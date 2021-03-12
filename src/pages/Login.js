import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { emailChange } from '../actions';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const minPwdLength = 5;
  const regexValidator = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    dispatch(emailChange(email));
  };

  if (isLoggedIn) return <Redirect to="/carteira" />;
  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Digite o seu email"
          data-testid="email-input"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          name="password"
          id="password "
          placeholder="Digite a sua senha"
          data-testid="password-input"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>
      <button
        type="submit"
        disabled={ !regexValidator.test(email) || password.length <= minPwdLength }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
