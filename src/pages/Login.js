import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmail as getEmailAction } from '../actions';
import TextInput from '../components/TextInput';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      emailIsValid: false,
      passwordIsValid: false,
    };

    this.changeState = this.changeState.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.emailValidation = this.emailValidation.bind(this);
    this.passwordValidation = this.passwordValidation.bind(this);
  }

  onChangeInput({ target: { name, value } }) {
    this.setState({ [name]: value });
    if (name === 'email') {
      this.emailValidation(value);
    } else {
      this.passwordValidation(value);
    }
  }

  changeState(state, item) {
    if (state) {
      this.setState({ [item]: true });
    } else {
      this.setState({ [item]: false });
    }
  }

  emailValidation(email) {
    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    this.changeState(regexEmail.test(email), 'emailIsValid');
  }

  passwordValidation(password) {
    const PASSWORD_MIN_LENGTH = 5;
    this.changeState(password.length > PASSWORD_MIN_LENGTH, 'passwordIsValid');
  }

  render() {
    const { emailIsValid, passwordIsValid, email, password } = this.state;
    const { history, getEmail } = this.props;

    return (
      <div>
        <TextInput
          htmlFor="email-input"
          labelText="Email:"
          id="email-input"
          name="email"
          type="text"
          value={ email }
          onChange={ this.onChangeInput }
          dataTestId="email-input"
          placeholder="user@email.com"
        />
        <TextInput
          htmlFor="password-input"
          labelText="Senha:"
          id="password-input"
          name="password"
          type="text"
          value={ password }
          onChange={ this.onChangeInput }
          dataTestId="password-input"
          placeholder="******"
        />
        <button
          disabled={ !passwordIsValid || !emailIsValid }
          type="button"
          onClick={ () => {
            getEmail(email);
            history.push('carteira');
          } }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getEmail: (email) => dispatch(getEmailAction(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  getEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
