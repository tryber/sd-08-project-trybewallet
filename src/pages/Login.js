import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import logo from '../assets/images/wallet.svg';
import '../styles/login.css';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.getFields = this.getFields.bind(this);
    this.verifyFields = this.verifyFields.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      email: '',
      password: '',
      wallet: false,
    };
  }

  getFields({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  verifyFields() {
    const { email, password } = this.state;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
    const passLength = 6;
    if (emailRegex.test(email) && password.split('').length >= passLength) {
      return false;
    }
    return true;
  }

  handleClick() {
    const { email } = this.state;
    const { loginUser } = this.props;
    loginUser(email);
    this.setState({ wallet: true });
  }

  render() {
    const { email, password, wallet } = this.state;
    let check = true;
    check = this.verifyFields();
    return (
      <section className="form-login">
        <img src={ logo } alt="Logo Wallet" />
        <input
          name="email"
          value={ email }
          onChange={ this.getFields }
          data-testid="email-input"
          type="text"
          placeholder="Digite seu email..."
          autoComplete="off"
        />
        <input
          name="password"
          value={ password }
          onChange={ this.getFields }
          data-testid="password-input"
          type="password"
          placeholder="Digite sua senha..."
        />
        <button onClick={ this.handleClick } type="button" disabled={ check }>
          Entrar
        </button>
        {wallet ? <Redirect to="/carteira" /> : ''}
      </section>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  loginUser: (email) => dispatch(login(email)),
});
export default connect(null, mapDispatchToProps)(Login);
