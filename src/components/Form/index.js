import React, { useState } from 'react';

function Form() {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  function handleChangeEmail(event) {
    setState({ ...state, email: event.target.value });
  }

  function handleChangePassword(event) {
    setState({ ...state, password: event.target.value });
  }

  return (
    <>
      <label htmlFor="email">
        E-mail:
        <input
          type="text"
          nome="email"
          data-testid="email-input"
          onChange={ handleChangeEmail }
        />
      </label>
      <label htmlFor="passoword">
        Senha:
        <input
          type="password"
          nome="password"
          data-testid="password-input"
          onChange={ handleChangePassword }
        />
      </label>
      <button
        type="button"
        onClick={ () => console.log(state) }
        disabled={
          ((Number(state.password.length) <= '5')) || !(((/\S+@\S+\.\S+/).test(state.email)))
        }
        to="/carteira"
      >
        Entrar
      </button>
    </>
  );
}

export default Form;
