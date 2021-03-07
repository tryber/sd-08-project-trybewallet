import React from 'react';
import TextInput from '../components/TextInput';

const PASSWORD_MIN_LENGHT = 5;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isEmailValid: false,
      isPassWordValid: false,
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.changeState = this.changeState.bind(this);
    this.emailValidation = this.emailValidation.bind(this);
    this.passwordValidation = this.passwordValidation.bind(this);
  }

  onChangeInput({ targe: { name, value } }) {
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
    this.changeState(password.length > PASSWORD_MIN_LENGHT, 'passwordIsValid');
  }

  render() {
    const { email, password, isEmailValid, isPassWordValid } = this.state;
    return (
      <div>
        <TextInput
          htmlFor="email-input"
          labelText="Email"
          id="email-input"
          name="email"
          type="text"
          value={ email }
          onChange={ this.onChangeText }
          dataTestId="email-input"
        />
        <TextInput 
          htmlFor="password-input"
          labelText="Senha"
          id="password-input"
          name="password"
          type="text"
          value={ password }
          onChange={ this.onChangeText }
          dataTestId="password-input"
        />
      </div>
    );
  }
}

export default Login;
