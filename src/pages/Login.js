import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import userLoginSuccessAction from '../actions';

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
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => {
      this.loginValidation();
    });
  }

  handleClick() {
    const { email } = this.state;
    const { userLoginSuccess } = this.props;
    userLoginSuccess(email);
    console.log(email);
    this.setState({
      login: true,
    });
  }

  loginValidation() {
    const { email, password } = this.state;
    let disabled = true;
    const EMAIL_VALIDATION = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;
    const MIN_PASSWORD_LENGTH = 6;
    disabled = !(EMAIL_VALIDATION.test(email) && password.length >= MIN_PASSWORD_LENGTH);
    this.setState({ disabled });
  }

  render() {
    const { disabled, login } = this.state;
    return (
      <main className="login-container">
        <label htmlFor="email">
          Email:
          <input
            name="email"
            type="text"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <label htmlFor="password">
          Senha:
          <input
            name="password"
            type="password"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        {
          disabled
            ? <>ENTRAR</>
            : <button type="button" onClick={ this.handleClick }>ENTRAR</button>
        }
        {
          login
            ? <Redirect to="/carteira" />
            : ''
        }
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLoginSuccess: (email) => dispatch(userLoginSuccessAction(email)),
});

Login.propTypes = {
  userLoginSuccess: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
