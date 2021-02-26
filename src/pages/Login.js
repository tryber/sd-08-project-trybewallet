import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import login from '../actions';

function emailIsValid(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const MIN_PASSWORD_LENGTH = 6;
function passwordIsValid(password) {
  return password.length >= MIN_PASSWORD_LENGTH;
}

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handleChangePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  inputValidation() {
    const { email, password } = this.state;
    const emailValidation = emailIsValid(email);
    const passwordValidation = passwordIsValid(password);

    if (emailValidation && passwordValidation) {
      return false;
    }
    return true;
  }

  render() {
    const { email, password } = this.state;
    const { saveEmail, history } = this.props;
    return (
      <>
        <label htmlFor="email">
          <h4>Email:</h4>
          <input
            type="text"
            id="email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChangeEmail }
          />
        </label>
        <label htmlFor="password">
          <h4>Password:</h4>
          <input
            type="text"
            id="password"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleChangePassword }
          />
        </label>
        <button
          disabled={ this.inputValidation() }
          type="button"
          onClick={ () => {
            saveEmail(email);
            history.push('/carteira');
          } }
        >
          Entrar
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (nome) => dispatch(login(nome)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  saveEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
