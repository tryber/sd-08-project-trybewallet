import React from 'react';
import { Link } from 'react-router-dom';

import '../css/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      emailValid: false,
      passwordValid: false,
    };

    this.getLogin = this.getLogin.bind(this);
  }

  getLogin(event) {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => this.validation());
  }

  validation() {
    const { email, password } = this.state;
    const SIX_CHARACTERS = 6;
    const regex = /\S+@\S+\.\S+/;

    if (regex.test(email)) {
      this.setState({
        emailValid: true,
      });
    } else {
      this.setState({
        emailValid: false,
      });
    }

    if (password.length >= SIX_CHARACTERS) {
      this.setState({
        passwordValid: true,
      });
    } else {
      this.setState({
        passwordValid: false,
      });
    }
  }

  render() {
    const { email, password, emailValid, passwordValid } = this.state;

    return (
      <section>
        <form>
          <label htmlFor="email">
            E-mail
            <input
              type="email"
              name="email"
              value={ email }
              placeholder="Digite seu email"
              data-testid="email-input"
              onChange={ this.getLogin }
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              type="password"
              name="password"
              value={ password }
              placeholder="Digite sua senha"
              onChange={ this.getLogin }
            />
          </label>
        </form>
        { (emailValid && passwordValid) ? <Link to="/carteira" className="normal">Entrar</Link> : <buttom type="buttom" className="disable">Não Entrar</buttom> }
      </section>
    );
  }
}

export default Login;
