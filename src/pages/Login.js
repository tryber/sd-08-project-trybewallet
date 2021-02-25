import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import loginAction from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disableSubmit: 'true',
      redirect: false,
    };

    this.logUser = this.logUser.bind(this);
    this.enableSubmit = this.enableSubmit.bind(this);
    this.handleInputsChanges = this.handleInputsChanges.bind(this);
  }

  // The setState() can receive a callBack as its second parameter. It runs right after the state changes - Tip by Bruno Pedrosa
  handleInputsChanges(e) {
    const typedValue = e.target.value;
    this.setState({
      [e.target.id]: typedValue,
    }, this.enableSubmit);
  }

  // Following regex found at: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  validEmail(email) {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return emailRegex.test(email);
  }

  enableSubmit() {
    const { email, password } = this.state;
    const MINIMUM_PASSWORD_LENGTH = 6;
    if (password.length >= MINIMUM_PASSWORD_LENGTH && this.validEmail(email)) {
      this.setState({
        disableSubmit: false,
      });
    } else {
      this.setState({
        disableSubmit: true,
      });
    }
  }

  logUser(e) {
    e.preventDefault();
    const { loginWithEmail } = this.props;
    const { email } = this.state;
    loginWithEmail(email);
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { disableSubmit, redirect } = this.state;
    return redirect
      ? <Redirect to="/carteira" />
      : (
        <form onSubmit={ this.logUser }>
          <input
            id="email"
            data-testid="email-input"
            type="email"
            placeholder="Email"
            onChange={ this.handleInputsChanges }
          />
          <input
            id="password"
            data-testid="password-input"
            type="password"
            placeholder="Senha"
            onChange={ this.handleInputsChanges }
          />
          <button
            type="submit"
            disabled={ disableSubmit }
          >
            Entrar
          </button>
        </form>
      );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginWithEmail: (email) => dispatch(loginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
