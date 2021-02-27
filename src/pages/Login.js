import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { storeEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loggedIn: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.loginValidation = this.loginValidation.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  loginValidation(email, password) {
    const MIN_PASSWORD_LENGTH = 6;

    // RegExp source: https://www.regular-expressions.info/email.html
    return (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(email)
    && password.length >= MIN_PASSWORD_LENGTH;
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleLogIn(event) {
    event.preventDefault();
    const { email } = this.state;
    const { storeEmail: storeEmailAction } = this.props;

    storeEmailAction(email);
    this.setState({
      loggedIn: true,
    });
  }

  render() {
    const { email, password, loggedIn } = this.state;

    if (loggedIn) return <Redirect to="/carteira" />;

    return (
      <section className="login-box">
        <form>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="E-mail"
            data-testid="email-input"
            onChange={ this.handleInputChange }
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Senha"
            data-testid="password-input"
            onChange={ this.handleInputChange }
          />
          <button
            type="submit"
            disabled={ !this.loginValidation(email, password) }
            onClick={ this.handleLogIn }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = {
  storeEmail,
};

Login.propTypes = {
  storeEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
