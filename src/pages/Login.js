import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmail as getEmailAction } from '../actions';
import TextInputLabel from '../components/TextInputLabel';

const MIN_QTY_CHARS_FOR_PASSWORD = 5;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      emailIsValid: false,
      passwordIsValid: false,
      email: '',
      password: '',
    };

    this.emailValidation = this.emailValidation.bind(this);
    this.passwordValidation = this.passwordValidation.bind(this);
    this.changeState = this.changeState.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText({ target: { name, value } }) {
    this.setState({ [name]: value });
    if (name === 'email') {
      this.emailValidation(value);
    } else {
      this.passwordValidation(value);
    }
  }

  changeState(state, item) {
    // console.log(state, item);
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
    this.changeState(password.length > MIN_QTY_CHARS_FOR_PASSWORD, 'passwordIsValid');
  }

  render() {
    const { emailIsValid, passwordIsValid, email, password } = this.state;
    const { history, getEmail } = this.props;

    return (
      <div>
        <TextInputLabel
          htmlFor="email-input"
          labelText="Email"
          id="email-input"
          name="email"
          type="text"
          value={ email }
          onChange={ this.onChangeText }
          dataTestId="email-input"
        />
        <TextInputLabel
          htmlFor="password-input"
          labelText="Senha"
          id="password-input"
          name="password"
          type="text"
          value={ password }
          onChange={ this.onChangeText }
          dataTestId="password-input"
        />
        <button
          disabled={ !passwordIsValid || !emailIsValid }
          type="button"
          onClick={ () => {
            // console.log(state, item);
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
