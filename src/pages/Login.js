import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';
import { userLoginAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
      shouldRedirect: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.verifyFieldsValidation = this.verifyFieldsValidation.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onInputChange({ target }) {
    this.setState(
      { [target.name]: target.value },
      () => {
        this.setState({ isButtonDisabled: !this.verifyFieldsValidation() });
      },
    );
  }

  onLogin(email) {
    const { submitLogin } = this.props;
    submitLogin(email);

    this.setState({ shouldRedirect: true });
  }

  verifyFieldsValidation() {
    const { email, password } = this.state;
    const MINIMAL_PASSWORD_CHARS = 6;

    const emailRegex = new RegExp([
      '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)',
      '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])',
      '|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
    ].join(''));

    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= MINIMAL_PASSWORD_CHARS;

    return isEmailValid && isPasswordValid;
  }

  render() {
    const { email, password, isButtonDisabled, shouldRedirect } = this.state;

    if (shouldRedirect) return <Redirect to="/carteira" />;

    return (
      <>
        <input
          type="text"
          placeholder="Login"
          name="email"
          data-testid="email-input"
          onChange={ this.onInputChange }
          value={ email }
        />
        <input
          type="password"
          placeholder="Senha"
          name="password"
          data-testid="password-input"
          onChange={ this.onInputChange }
          value={ password }
        />
        <button
          type="button"
          disabled={ isButtonDisabled }
          onClick={ () => this.onLogin(email) }
        >
          Entrar
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitLogin: (email) => dispatch(userLoginAction(email)),
});

Login.propTypes = {
  submitLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
