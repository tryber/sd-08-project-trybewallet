import React from 'react';
import './login.css';

/* const loginCheck = (target) => {
  let passou = false;
  const inputMail = document.getElementsByClassName('ok');
  const exp = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
  passou = exp.test(inputMail.text);
  if (passou === false) { target.disabled = true; } else { target.disabled = false; }
  console.log(passou);
  return passou;
}; */

export default class Login extends React.Component {
  render() {
    return (
      <div className="campos_login">
        <h1 className="label">Faça login</h1>
        <input
          type="email"
          pattern="/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/"
          classename="inputeml"
          data-testid="email-input"
          title="Formato correto: email@dominio.com.br"
        />
        <input type="password" data-testid="password-input" minLength="3" />
        <button
          name="button"
          type="button"
          data-testid="btnEntrar"
        // onClick={ loginCheck() }
        >
          Entrar
        </button>
      </div>
    );
  }
}
