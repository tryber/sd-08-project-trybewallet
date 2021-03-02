import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { handleUserLoginAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isButtonUnavailable: true,
      shouldRedirect: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleValidateForm = this.handleValidateForm.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    },
    () => {
      this.setState({ isButtonUnavailable: !this.handleValidateForm() });
    });
  }

  handleValidateForm() {
    const { email, password } = this.state;

    const PASSWORD_MIN_LENGTH = 6;

    if (
      new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)
      && password.length >= PASSWORD_MIN_LENGTH
    ) return true;

    return false;
  }

  handleAuthentication(email) {
    const { handleUserLogin } = this.props;

    if (this.handleValidateForm) {
      handleUserLogin(email);

      this.setState({ shouldRedirect: true });
    }
  }

  render() {
    const { email, password, isButtonUnavailable, shouldRedirect } = this.state;

    if (shouldRedirect) return <Redirect to="/carteira" />;

    return (
      <>
        <label htmlFor="email">
          E-mail

          <input
            id="email"
            name="email"
            type="text"
            value={ email }
            onChange={ this.handleInputChange }
            data-testid="email-input"
          />
        </label>

        <label htmlFor="password">
          Senha

          <input
            id="password"
            name="password"
            type="password"
            value={ password }
            onChange={ this.handleInputChange }
            data-testid="password-input"
          />
        </label>

        <button
          type="button"
          disabled={ isButtonUnavailable }
          onClick={ () => this.handleAuthentication(email) }
        >
          Entrar
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleUserLogin: (email) => dispatch(handleUserLoginAction(email)),
});

Login.propTypes = {
  handleUserLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
