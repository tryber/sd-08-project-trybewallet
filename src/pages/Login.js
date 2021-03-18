import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveLoginInfo } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.renderLogin = this.renderLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.validateEmail = this.validateEmail.bind(this);

    this.state = {
      email: '',
      senha: '',
      disableBtn: true,
      redirect: false,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }), () => {
      this.verifyInputs();
    });
  }

  // Função de validar email encontrada no site: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  // Descobri esse site pela brach de Bruno Pedrosa
  validateEmail(email) {
    const re = new RegExp([
      '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)',
      '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])',
      '|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
    ].join(''));
    return re.test(String(email).toLowerCase());
  }

  verifyInputs() {
    const { email, senha } = this.state;
    const passwordLenght = 6;
    if (this.validateEmail(email) && senha.length >= passwordLenght) {
      this.setState({ disableBtn: false });
    } else {
      this.setState({ disableBtn: true });
    }
  }

  handleLogin() {
    const { loginAction } = this.props;
    const { email } = this.state;
    loginAction({ email });
    this.setState({ redirect: true });
  }

  renderLogin() {
    const { email, senha, disableBtn } = this.state;

    return (
      <section>
        <h1>Login</h1>
        <label htmlFor="email-input">
          Email:
          <input
            data-testid="email-input"
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            data-testid="password-input"
            type="password"
            name="senha"
            value={ senha }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ disableBtn }
          onClick={ () => {
            this.handleLogin();
          } }
        >
          Entrar
        </button>
      </section>
    );
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/carteira" />;
    }

    return this.renderLogin();
  }
}

Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loginAction: (obj) => dispatch(saveLoginInfo(obj)),
});

export default connect(null, mapDispatchToProps)(Login);
