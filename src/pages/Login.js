import React, { useState } from 'react';

let isDisable = true;
const maxLengthPassword = 6;

function validatePassword(e) {
  const { name, value } = e.target;
  // console.log(value.length);
  // console.log(` ${name === 'password'}  ${value.length >= maxLengthPassword}`);
  if (name === 'password' && value.length >= maxLengthPassword) {
    console.log('passou');
    isDisable = false;
  } else if (name === 'password') {
    isDisable = true;
  }
}

function validateEmail(e) {
  const { name, value } = e.target;
  // console.log(value);
  const re = /\S+@\S+\.\S+/;
  if (name === 'email' && re.test(String(value).toLowerCase())) {
    isDisable = false;
  } else if (name === 'email') {
    isDisable = true;
  }
}

const Login = () => {
  const [from, setFrom] = useState({ email: '', password: '' });
  function changeFrom(e) {
    const { name, value } = e.target;
    setFrom({ ...from, [name]: value });
  }
  function submitFrom(e) {
    e.preventDefault();
    e.setState({ email: e.target.value });
    console.log(from);
  }
  return (
    <form onSubmit={ submitFrom }>
      Email:
      <input
        name="email"
        type="text"
        data-testid="email-input"
        required="required"
        value={ from.email }
        onKeyUp={ validateEmail }
        onChange={ changeFrom }
      />
      Senha:
      <input
        // codigo inspirado nesse tutorial
        // https://dev.to/cooljasonmelton/build-this-cool-password-checklist-with-react-and-css-4j1e
        name="password"
        type="password"
        data-testid="password-input"
        value={ from.password }
        required="required"
        onKeyUp={ validatePassword }
        onChange={ changeFrom }
      />
      <div>
        <button type="submit" disabled={ isDisable }>Entrar</button>
      </div>
    </form>
  );
};

export default Login;
