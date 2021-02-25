import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import loginUserAction from '../actions/loginUser';
import isLoggedAction from '../actions/isLoggedAction';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      verification: { emailVerified: false, passwordVerified: false },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    if (name === 'email' && this.verifyEmail(value)) {
      this.setState((prevState) => (
        { verification: { ...prevState.verification, emailVerified: true } }
      ));
    }
    if (name === 'password' && this.verifyPassword(value)) {
      this.setState((prevState) => (
        { verification: { ...prevState.verification, passwordVerified: true } }
      ));
    }
  }

  handleClick() {
    const { login, isLogged } = this.props;
    const { email } = this.state;

    login(email);
    isLogged();
  }

  verifyEmail(email) {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i;
    return regexEmail.test(email);
  }

  verifyPassword(password) {
    const minPasswordLength = 6;
    if (password.length >= minPasswordLength) {
      return true;
    }
  }

  render() {
    const {
      email,
      password,
      verification: { emailVerified, passwordVerified },
    } = this.state;
    const { logStatus } = this.props;
    if (logStatus) {
      console.log(logStatus);
      return (<Redirect to="/carteira" />);
    }

    return (
      <>
        <label htmlFor="email">
          Email:
          <input
            name="email"
            type="text"
            value={ email }
            onChange={ this.handleChange }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            name="password"
            type="text"
            value={ password }
            onChange={ this.handleChange }
            data-testid="password-input"
          />
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
          disabled={ !(emailVerified && passwordVerified) }
        >
          Entrar
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  logStatus: state.logStatus.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(loginUserAction(email)),
  isLogged: () => dispatch(isLoggedAction()),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isLogged: PropTypes.func.isRequired,
  logStatus: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
