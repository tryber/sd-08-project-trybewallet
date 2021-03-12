import React from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import dispatchEmail from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validaAndteLogin = this.validaAndteLogin.bind(this);
    this.clickRedirect = this.clickRedirect.bind(this);
  }

  clickRedirect() {
    const { sendEmail } = this.props;
    const { email } = this.state;
    sendEmail(email);
    this.setState({
      redirect: true,
    });
  }

  validaAndteLogin() {
    const { password, email } = this.state;
    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const FIVE = 5;
    if (regexEmail.test(email) && password.length > FIVE) {
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
    const { email, password, redirect } = this.state;
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
          onClick={ () => this.clickRedirect() }
          disabled={ this.validaAndteLogin() }
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
        { redirect && <Redirect to="/carteira" /> }
      </form>
    );
  }
}

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (payload) => dispatch(dispatchEmail(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
