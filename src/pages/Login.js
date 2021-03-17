import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';

import dispatchEmail from '../actions';
import logo from '../logo.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.validaAndteLogin = this.validaAndteLogin.bind(this);
    this.clickRedirect = this.clickRedirect.bind(this);
  }

  clickRedirect() {
    const { sendEmail, history } = this.props;
    const { email } = this.state;
    sendEmail(email);
    history.push('/carteira');
  }

  validaAndteLogin() {
    const { password, email } = this.state;
    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const SIX = 6;
    if (regexEmail.test(email) && password.length >= SIX) {
      return false;
    }
    return true;
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <>
        <img className="App-logo" src={ logo } alt="logoPokewallet" width="600px" />
        <form className="App">
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
            onClick={ () => this.clickRedirect() }
            disabled={ this.validaAndteLogin() }
            data-testid="login-submit-btn"
          >
            Entrar
          </button>
        </form>
      </>
    );
  }
}

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (payload) => dispatch(dispatchEmail(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
