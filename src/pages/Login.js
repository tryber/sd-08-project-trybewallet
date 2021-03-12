import React from 'react';
import PropTypes from 'prop-types';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validaAndteLogin = this.validaAndteLogin.bind(this);
    this.clickRedirect = this.clickRedirect.bind(this);
  }

  clickRedirect() {
    const { history } = this.props;
    history.push('/carteira');
  }

  validaAndteLogin() {
    const { password, email } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    const SIX = 6;
    if (email > emailRegex && password.length > SIX) {
      this.setState({ disabled: false });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => this.validaAndteLogin());
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email:
          <input
            data-testid="email-input"
            type="text"
            value={ email }
            name="email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            data-testid="password-input"
            type="text"
            value={ password }
            name="password"
            minLength="6"
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <button
          type="button"
          onClick={ this.clickRedirect }
          disabled={ disabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
