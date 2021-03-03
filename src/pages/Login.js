import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { loginAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      senha: '',
      redirect: false,
      buttonDisabed: true,
    };

    this.inputChange = this.inputChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  onLogin(email) {
    const { submitLogin } = this.props;
    submitLogin(email);

    this.setState({ redirect: true });
  }

  inputChange({ target }) {
    const { name, value } = target;

    this.setState(
      { [name]: value },
      () => {
        this.setState({ buttonDisabed: !this.validateEmail() });
      },
    );
  }

  validateEmail() {
    const { email, senha } = this.state;
    const MINIMAL_PASSWORD_LENGHT = 6;

    const isEmailValidated = email.includes('@') && email.includes('.com');
    const isPasswordValidated = senha.length >= MINIMAL_PASSWORD_LENGHT;

    return isEmailValidated && isPasswordValidated;
  }

  render() {
    const { email, senha, buttonDisabed, redirect } = this.state;

    if (redirect) return <Redirect to="/carteira" />;

    return (
      <>
        <label htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            onChange={ this.inputChange }
            data-testid="email-input"
            type="email"
            value={ email }
          />
        </label>
        <label htmlFor="senha">
          Senha
          <input
            id="senha"
            name="senha"
            onChange={ this.inputChange }
            data-testid="password-input"
            type="password"
            value={ senha }
          />
        </label>
        <button
          disabled={ buttonDisabed }
          onClick={ () => this.onLogin(email) }
          type="button"
        >
          Entrar
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitLogin: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  submitLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
