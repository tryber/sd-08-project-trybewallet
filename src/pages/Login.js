import React, { Component } from 'react';
import Timer from 'react-compound-timer';
import { Redirect } from 'react-router-dom';
import { MIN_PASSWORD_LENGHT, REGEX_VERIFY_EMAIL } from '../consts';
import Button from '../components/Button';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validEmail: false,
      validPassword: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.redirect = this.redirect.bind(this);
    this.helperMessageEmail = this.helperMessageEmail.bind(this);
    this.helperMessagePassword = this.helperMessagePassword.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.verifyEmail());
    this.setState((prevState) => ({
      ...prevState, validPassword: prevState.password.length >= MIN_PASSWORD_LENGHT,
    }));
  }

  verifyEmail() {
    const { email } = this.state;
    if (REGEX_VERIFY_EMAIL.test(email)) {
      this.setState({
        validEmail: true,
      });
    } else if (!REGEX_VERIFY_EMAIL.test(email)) {
      this.setState({
        validEmail: false,
      });
    }
  }

  helperMessageEmail() {
    const { email, validEmail } = this.state;
    const THREE = 3;
    let message;
    if (email.length > THREE) {
      message = validEmail ? (
        <span style={ { color: 'green' } }>
          <span role="img" aria-label="green-checked-box">✅</span>
          <br />
          E-mail válido!
        </span>
      ) : (
        <span style={ { color: 'red' } }>
          <span role="img" aria-label="red-x-mark">❌</span>
          <br />
          Digite um e-mail válido...
        </span>
      );
    }
    return message;
  }

  helperMessagePassword() {
    const { password, validPassword } = this.state;
    let message;
    if (password.length) {
      message = validPassword
        ? (
          <span style={ { color: 'green' } }>
            <span role="img" aria-label="green-checked-box">✅</span>
            <br />
            Senha válida!
          </span>
        )
        : (
          <span style={ { color: 'red' } }>
            <span role="img" aria-label="red-x-mark">❌</span>
            <br />
            A senha precisa ter ao menos 6 dígitos...
          </span>
        );
    }
    return message;
  }

  redirect() {
    return <Redirect to="/carteira" />;
  }

  renderEmailInput() {
    return (
      <label htmlFor="email">
        E-mail:
        <input
          className="login-form-email"
          data-testid="email-input"
          name="email"
          type="email"
          onChange={ this.handleChange }
          placeholder="Digite seu e-mail"
          required
        />
        { this.helperMessageEmail()}
      </label>
    );
  }

  renderPasswordInput() {
    return (
      <label htmlFor="password">
        Senha:
        <input
          className="login-form-password"
          data-testid="password-input"
          name="password"
          type="password"
          onChange={ this.handleChange }
          placeholder="Digite sua senha"
          minLength={ MIN_PASSWORD_LENGHT }
          required
        />
        { this.helperMessagePassword()}
      </label>
    );
  }

  renderForm() {
    const renderThisForm = [this.renderEmailInput(), this.renderPasswordInput()];
    return renderThisForm.map((func, index) => <div key={ index }>{func}</div>);
  }

  render() {
    const { email, password, validEmail, validPassword } = this.state;
    return (

      <form className="login-form">
        <Timer initialTime={ 5500 } direction="backward">
          {() => (
            <>
              <Timer.Seconds />
              {' '}
              seconds
              {' '}
              <Timer.Milliseconds />
              {' '}
              milliseconds
            </>)}
        </Timer>
        <fieldset>
          <legend className="login-form-title">Insira seus dados:</legend>
          {this.renderForm()}
        </fieldset>
        <Button
          verifyEmail={ validEmail }
          verifyPassword={ validPassword }
          emailToSave={ email }
          passwordToSave={ password }
        />
      </form>
    );
  }
}

export default Login;
