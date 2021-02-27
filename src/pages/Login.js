import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../actions';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      button: true,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.verification = this.verification.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => this.verification());
  }

  handleClick() {
    const { login } = this.props;
    const { email } = this.state;
    login(email);
    this.setState({
      redirect: true,
    });
  }

  verification() {
    const { email, password } = this.state;
    const PASSWORD_LENGTH = 6;
    const EMAIL_REGEX = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;
    if (password.length >= PASSWORD_LENGTH && EMAIL_REGEX.test(email)) {
      this.setState({
        button: false,
      });
    } else {
      this.setState({
        button: true,
      });
    }
  }

  render() {
    const { email, password, button, redirect } = this.state;
    return (
      <div>
        <h2>Login</h2>
        <input
          data-testid="email-input"
          type="text"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ button }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
        { redirect ? (<Redirect to="/carteira" />) : '' }
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (value) => (dispatch(loginAction(value))),
});

export default connect(null, mapDispatchToProps)(Login);
