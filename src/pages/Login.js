import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import loginAction from '../actions';

const SEIS = 6;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.verifyEmail = this.verifyEmail.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
    this.verifyButton = this.verifyButton.bind(this);
    this.submitAndRedirect = this.submitAndRedirect.bind(this);

    this.state = { emailLocal: '', password: '', buttonDisable: true };
  }

  verifyEmail(email) {
    this.setState({ emailLocal: email.target.value },
      () => this.verifyButton());
  }

  verifyPassword(pass) {
    this.setState({ password: pass.target.value },
      () => this.verifyButton());
  }

  // regex utilizado na função a seguir foi retirado do Fórum Trybe!
  verifyButton() {
    const { emailLocal, password } = this.state;
    const emailRegex = new RegExp('[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$', 'gm');
    if (emailRegex.test(emailLocal)
      && password.length >= SEIS) {
      this.setState({ buttonDisable: false });
    } else {
      this.setState({ buttonDisable: true });
    }
  }

  submitAndRedirect() {
    const { submitLogin, history } = this.props;
    const { emailLocal } = this.state;
    submitLogin(emailLocal);
    history.push('/carteira');
  }

  render() {
    const { buttonDisable } = this.state;
    return (
      <div className="login-container">
        <h3>Login</h3>
        <label htmlFor="email-label">
          <input
            type="text"
            placeholder="Email"
            data-testid="email-input"
            onChange={ this.verifyEmail }
          />
        </label>
        <label htmlFor="password-label">
          <input
            type="text"
            placeholder="Password"
            data-testid="password-input"
            onChange={ this.verifyPassword }
          />
        </label>
        <button
          type="submit"
          disabled={ buttonDisable }
          onClick={ () => this.submitAndRedirect() }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitLogin: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  submitLogin: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
