import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { INITIAL_STATE, REGEX_VERIFY_EMAIL } from '../components/Allconsts';
import Button from '../components/Button';
import Wallet from './Wallet';

class Login extends React.Component {
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
    this.verifyPassword = this.verifyPassword.bind(this);
    this.redirect = this.redirect.bind(this);
    this.helperMessageEmail = this.helperMessageEmail.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.verifyEmail();
    this.verifyPassword();
  }

  verifyEmail() {
    const { email } = this.state;
    if (REGEX_VERIFY_EMAIL.test(email)) {
      this.setState({
        validEmail: true,
      });
    } else {
      this.setState({
        validEmail: false,
      });
    }
  }

  verifyPassword() {
    const { password } = this.state;
    const FIVE = 5;
    if (password.length > FIVE) {
      this.setState({
        validPassword: true,
      });
    } else {
      this.setState({
        validPassword: false,
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

  redirect() {
    return <Redirect to="/carteira" />;
  }

  renderButton() {
    const { validEmail, validPassword } = this.state;
    return validEmail && validPassword === true
      ? <button type="button" disabled={ false }>Entrar</button>
      : <button type="button" disabled>Entrar</button>;
  }

  render() {
    const MIN_PASSWORD_LENGHT = 6;
    const { email, password, validEmail } = this.state;
    return (
      <form className="login">
        <fieldset>
          <div>
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
          </div>
          <div>
            <label htmlFor="login">
              password:
              <input
                data-testid="password-input"
                name="password"
                type="password"
                onChange={ this.handleChange }
                placeholder="Digite sua password"
                minLength={ MIN_PASSWORD_LENGHT }
                required
              />
            </label>
          </div>
          <Link to="/carteira">{this.renderButton()}</Link>
        </fieldset>
      </form>
    );
  }
}

export default Login;
