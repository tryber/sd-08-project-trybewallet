import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { MIN_PASSWORD_LENGHT, REGEX_VERIFY_EMAIL } from '../consts';
import Button from '../components/Button';

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
      message = validEmail ? 'E-mail válido!' : 'Digite um e-mail válido...';
    }
    return message;
  }

  helperMessagePassword() {
    const { password, validPassword } = this.state;
    let message;
    if (password.length) {
      message = validPassword ? 'Senha serve!' : 'A senha precisa ter ao menos 6 dígitos';
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
          data-testid="email-input"
          name="email"
          type="email"
          onChange={ this.handleChange }
          placeholder="Digite seu e-mail"
          required
        />
        <span>
          { this.helperMessageEmail()}
        </span>
      </label>
    );
  }

  renderPasswordInput() {
    return (
      <label htmlFor="password">
        Senha:
        <input
          data-testid="password-input"
          name="password"
          type="password"
          onChange={ this.handleChange }
          placeholder="Digite sua password"
          minLength={ MIN_PASSWORD_LENGHT }
          required
        />
        <span>
          { this.helperMessagePassword()}
        </span>
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
      <form className="login">
        <fieldset>
          {this.renderForm()}
        </fieldset>
        <Link to="/carteira">
          <Button
            verifyEmail={ validEmail }
            verifyPassword={ validPassword }
            emailToSave={ email }
            passwordToSave={ password }
          />
        </Link>
      </form>
    );
  }
}

export default Login;
