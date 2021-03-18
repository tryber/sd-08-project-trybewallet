import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { login as UserActions } from '../actions/user';

import styles from '../styles/components/LoginForm.module.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginValidation = this.loginValidation.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { saveEmail } = this.props;
    const { email } = this.state;
    saveEmail(email);
    this.setState({
      redirect: true,
    });
  }

  loginValidation() {
    const { email, password } = this.state;
    const MINIMUM_PASSWORD_LENGTH = 6;
    if (password.length < MINIMUM_PASSWORD_LENGTH) return false;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return false;
    return true;
  }

  render() {
    const { email, password, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/carteira" />;
    }
    return (
      <div className={ styles.loginFormContainer }>
        <form
          className={ styles.loginForm }
          onSubmit={ this.handleSubmit }
          autoComplete="off"
        >
          <input
            type="text"
            name="email"
            value={ email }
            data-testid="email-input"
            placeholder="Email"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            name="password"
            value={ password }
            data-testid="password-input"
            placeholder="Senha"
            onChange={ this.handleChange }
          />
          <button
            disabled={ !this.loginValidation() }
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(UserActions.saveEmail(email)),
});

LoginForm.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(LoginForm);
