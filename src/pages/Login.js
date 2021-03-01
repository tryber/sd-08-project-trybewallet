import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.renderEmailInput = this.renderEmailInput.bind(this);
    this.click = this.click.bind(this);
    this.state = {
      userEmail: '',
      password: '',
      validEmail: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
      isLoggedIn: false,
    };
  }

  // regex disponivel em: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  click() {
    const { userEmail } = this.state;
    const { executeLogin } = this.props;
    executeLogin(userEmail);
    this.setState({ isLoggedIn: true });
  }

  renderPasswordInput() {
    const { password } = this.state;
    return (
      <div>
        <label
          htmlFor="email"
        >
          Senha
          <input
            type="password"
            name="password"
            value={ password }
            data-testid="password-input"
            onChange={ this.handleChange }
            minLength="6"
            required
          />
        </label>
      </div>
    );
  }

  renderEmailInput() {
    const { userEmail } = this.state;
    return (
      <div>
        <label
          htmlFor="email-input"
        >
          E-mail
          <input
            id="email"
            type="email"
            name="userEmail"
            value={ userEmail }
            data-testid="email-input"
            onChange={ this.handleChange }
            required
          />
        </label>
      </div>
    );
  }

  render() {
    const { userEmail, password, validEmail, isLoggedIn } = this.state;
    const SIX = 6;
    if (isLoggedIn) return (<Redirect to="/carteira" />);
    return (
      <div className="login-form-container">
        <h1>Trybe Wallet</h1>
        <form className="login-form" onSubmit={ (e) => e.preventDefault() }>
          { this.renderEmailInput() }
          { this.renderPasswordInput() }
          <div>
            <button
              type="button"
              disabled={ !validEmail.test(userEmail) || password.length < SIX }
              onClick={ this.click }
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  executeLogin: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return ({
    executeLogin: (userEmail) => dispatch(login(userEmail)),
  });
}

export default connect(null, mapDispatchToProps)(Login);
