import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { login as loginAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      message: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleClick() {
    const { email } = this.state;
    const { login } = this.props;
    if (!this.validateEmail() && !this.validatePassword()) {
      login(email);
      this.setState({
        message: 'Ok',
      });
    } else {
      this.setState({
        message: 'Email ou senha inválida',
      });
    }
  }

  validateEmail() {
    const { email } = this.state;
    const validEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    return !(validEmail);
  }

  validatePassword() {
    const { password } = this.state;
    const MINIMUM_PASSWORD_LENGTH = 6;
    return password.length < MINIMUM_PASSWORD_LENGTH;
  }

  render() {
    const { email, password, message } = this.state;

    if (message === 'Ok') {
      return <Redirect to="/carteira" />;
    }

    return (
      <section>
        <label htmlFor="email-input">
          <input
            data-testid="email-input"
            id="email-input"
            name="email"
            onChange={ this.handleChange }
            type="text"
            value={ email }
          />
        </label>
        <label htmlFor="password-input">
          <input
            data-testid="password-input"
            id="password-input"
            name="password"
            onChange={ this.handleChange }
            type="text"
            value={ password }
          />
        </label>
        <button onClick={ this.handleClick } type="button">Entrar</button>
        <p className="error-message">{ message }</p>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
