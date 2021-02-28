import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      disabled: false,
      password: '',
      redirect: false,
    };

    this.formValidation = this.formValidation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  formValidation() {
    const { email, password } = this.state;
    const PASSWORD_LENGTH = 6;
    const regexEmail = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;
    const disabled = regexEmail.test(email) && password.length < PASSWORD_LENGTH;
    console.log(disabled);
    this.setState({
      disabled,
    });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => this.formValidation());
  }

  handleClick() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { email, disabled, redirect } = this.state;
    return (
      <div>
        <h2>Login</h2>
        <form>
          <input
            type="text"
            name="email"
            value={ email }
            placeholder="email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            name="password"
            placeholder="senha"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
          { redirect ? <Redirect to="/carteira" /> : '' }
        </form>
      </div>
    );
  }
}

export default Login;
