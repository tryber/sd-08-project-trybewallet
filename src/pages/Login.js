import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import verifyLogin from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      ableBtn: '',
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
      ableBtn: '',
      redirect: '',
    });
    const { email, password } = this.state;
    const passwordLimit = 4;
    const a = new RegExp('[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$', 'gm');
    if (password.length > passwordLimit && a.test(email) === true) {
      this.setState({
        ableBtn: 'true',
      });
    }
  }

  handleClick() {
    const { email } = this.state;
    const { login } = this.props;
    login(email);
    this.setState({
      redirect: 'true',
    });
  }

  render() {
    const { ableBtn, email, password, redirect } = this.state;
    return (
      <form>
        {redirect ? <Redirect to="/carteira" /> : <div>Login</div>}
        <label htmlFor="emailField">
          Email:
          <input
            type="email"
            id="emailField"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="passwordField">
          Senha:
          <input
            type="password"
            id="passwordField"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ !ableBtn }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(verifyLogin(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
