import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.handleInput = this.handleInput.bind(this);

    this.state = {
      email: '',
      password: '',
      validForm: false,
    };
  }

  validateEmail(email) {
    const regex = new RegExp(/\S+@\S+\.\S+/);
    return regex.test(email);
  }

  validatePassword(password) {
    const MIN_CHARACTERS = 6;
    if (password.length >= MIN_CHARACTERS) return true;
    return false;
  }

  handleInput({ target }) {
    const { email, password } = this.state;
    const checkEmail = target.name === 'email'
      ? this.validateEmail(target.value)
      : this.validateEmail(email);
    const checkPassword = target.name === 'password'
      ? this.validatePassword(target.value)
      : this.validatePassword(password);
    const validForm = checkEmail && checkPassword;
    this.setState(({
      [target.name]: target.value,
      validForm,
    }));
  }

  render() {
    const { validForm, email, password } = this.state;
    const { handleLogin, history } = this.props;
    return (
      <div>
        <form>
          <input
            type="email"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleInput }
          />
          <input
            type="password"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.handleInput }
          />
          <button
            type="button"
            disabled={ !validForm }
            onClick={ () => {
              handleLogin(this.state);
              history.push('/carteira');
            } }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (state) => {
    const { email } = state;
    dispatch(login({ email }));
  },
});

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
