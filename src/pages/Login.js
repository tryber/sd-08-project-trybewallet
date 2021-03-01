import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import '../css/login.css';

import { login as loginAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      emailValid: false,
      passwordValid: false,
      loggedIn: false,
    };

    this.getLogin = this.getLogin.bind(this);
    this.logon = this.logon.bind(this);
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

  logon() {
    const { email } = this.state;
    const { login } = this.props;
    login(email);
    this.setState({
      loggedIn: true,
    });
  }

  render() {
    const { email, password, emailValid, passwordValid, loggedIn } = this.state;

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
              data-testid="password-input"
              onChange={ this.getLogin }
            />
          </label>
        </form>
        { (emailValid && passwordValid)
          ? (
            <button
              type="button"
              className="button"
              onClick={ this.logon }
            >
              Entrar
            </button>)
          : <button type="button" className="button disabled" disabled>Entrar</button>}
        {loggedIn && <Redirect to="/carteira" />}
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(loginAction(data)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = { login: PropTypes.func.isRequired };
