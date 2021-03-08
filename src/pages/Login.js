import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveLogin } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.sendAccessData = this.sendAccessData.bind(this);
    this.checkLoginData = this.checkLoginData.bind(this);
    this.submitLogin = this.submitLogin.bind(this);

    this.state = {
      email: '',
      password: '',
      redirect: false,
    };
  }

  sendAccessData({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  checkLoginData() {
    const { email, password } = this.state;
    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const validateEmail = regexEmail.test(email);
    const passwordMinimumLengthRequired = 6;
    const validatePassword = password.length >= passwordMinimumLengthRequired;
    if (validateEmail && validatePassword) {
      return false;
    }
    return true;
  }

  submitLogin() {
    const { email } = this.state;
    const { saveLoginDispatch } = this.props;
    saveLoginDispatch(email);
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { email, password, redirect } = this.state;
    return (
      <div>
        <h1>TRYBE WALLET</h1>
        <form id="loginForm">
          <label htmlFor="email">
            E-mail:
            <input
              type="text"
              id="email"
              name="email"
              value={ email }
              data-testid="email-input"
              autoComplete="on"
              onChange={ this.sendAccessData }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              id="password"
              name="password"
              value={ password }
              data-testid="password-input"
              autoComplete="on"
              onChange={ this.sendAccessData }
            />
          </label>
          <button
            type="button"
            name="Entrar"
            data-testid="login-submit-btn"
            disabled={ this.checkLoginData() }
            onClick={ () => {
              this.submitLogin();
            } }
          >
            Entrar
          </button>
          {redirect && <Redirect to="/carteira" />}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveLoginDispatch: (email) => dispatch(saveLogin(email)),
});

Login.propTypes = {
  saveLoginDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
