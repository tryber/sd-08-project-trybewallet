import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { emailChange } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
      login: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.loginValidation = this.loginValidation.bind(this);
  }

  // Atualiza estado geral do email ao clicar
  handleClick() {
    const { handleEmail } = this.props;
    const { email } = this.state;
    this.setState({ login: true });
    handleEmail(email);
  }

  // Atualiza estado do email e senha na página de Login
  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.loginValidation();
    });
  }

  // Verifica se o email e senha são válidos
  loginValidation() {
    const { email, password } = this.state;
    let disabled = false;
    const emailValidation = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;
    const passwordLength = 6;
    disabled = !(emailValidation.test(email) && password.length >= passwordLength);
    this.setState({ disabled });
  }

  render() {
    const { email, password, disabled, login } = this.state;
    return (
      <main className="login-main">
        <header className="login-header">
          <h1>Trybe Wallet</h1>
        </header>
        <form className="login-form">
          <input
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="email-input"
            placeholder="user@email.com"
            className="login-input"
          />
          <input
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            data-testid="password-input"
            placeholder="******"
            className="login-input"
          />
          <button
            type="submit"
            disabled={ disabled }
            onClick={ this.handleClick }
            className="login-btn"
          >
            Entrar
          </button>
        </form>
        {login ? <Redirect to="/carteira" /> : ''}
      </main>
    );
  }
}

Login.propTypes = {
  handleEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleEmail: (payload) => dispatch(emailChange(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
