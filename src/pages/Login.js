import React from 'react';
import logo from '../svg/045-wallet.svg';
import './Login.css';

class Login extends React.Component {
  render() {
    return (
      <div className="login-page">
        <section>
          <label htmlFor="userEmail">
            <span>Email</span>
            <input
              type="email"
              name="userEmail"
              id="userEmail"
              data-testid="email-input"
            />
          </label>
          <label htmlFor="userPassword">
            <span>Senha</span>
            <input
              type="password"
              name="userPassword"
              id="userPassword"
              data-testid="password-input"
            />
          </label>
          <button
            type="button"
          >
            Entrar
          </button>
          <div className="login-title">
            <h1>Deori</h1>
            <p>Wallet</p>
            <img src={ logo } alt="" />
          </div>
        </section>
        <div className="link-freepik-best-icons">
          Icons made by&nbsp;
          <a href="https://www.freepik.com" title="Freepik">Freepik</a>
          &nbsp;from&nbsp;
          <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
        </div>
      </div>
    );
  }
}

export default Login;
