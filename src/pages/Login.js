import React from 'react';
import './login.css';

// const btn = document.getElementById('btnEntrar');

/* function ligaDesliga() {
  const inputMail = document.getEl('email-input');
  const exp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  let passou = false;
  passou = exp.test(inputMail.text);
  if (passou === false) { btn.disabled = true; } else { btn.disabled = false; }
  console.log(passou);
  return passou;
} */

export default class Login extends React.Component {
  render() {
    return (
      <div className="campos_login">
        <h1 className="label">Faça login</h1>
        <input type="text" data-testid="email-input" />
        <input type="password" data-testid="password-input" />
        <button type="button" data-testid="btnEntrar">Entrar</button>
      </div>
    );
  }
}
