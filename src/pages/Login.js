import React from 'react';
import logo from '../svg/045-wallet.svg';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: '',
      passLength: 0,
    };
    this.handleInput = this.handleInput.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
  }

  handleInput(key, value) {
    this.setState({
      [key]: value,
    });
  }

  checkInputs() {
    const minPassLength = 6;
    const { inputEmail, passLength } = this.state;
    const emailBool = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(inputEmail);
    if(passLength >= minPassLength && emailBool) {
      return true;
    }
    return false;
  }

  render() {
    const { inputEmail } = this.state;
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
              value={ inputEmail }
              onChange={ ({ target: { value } }) => this.handleInput('inputEmail', value) }
            />
          </label>
          <label htmlFor="userPassword">
            <span>Senha</span>
            <input
              type="password"
              name="userPassword"
              id="userPassword"
              data-testid="password-input"
              onChange={ ({ target: { value } }) => this.handleInput('passLength', value.length) }
            />
          </label>
          <button
            type="button"
            disabled={ !this.checkInputs() }
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
