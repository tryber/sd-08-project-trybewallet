import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dataLogin from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isValid: true,
    };

    this.validInputs = this.validInputs.bind(this);
  }

  validInputs() {
    const { email, password } = this.state;
    const regexEmail = new RegExp('[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$', 'gm');
    const regexPassword = new RegExp('^.{5,}$');

    const emailValid = email.match(regexEmail);
    const passwordValid = password.match(regexPassword);

    if (emailValid && passwordValid) {
      this.setState({
        isValid: false,
      });
    } else {
      this.setState({
        isValid: true,
      });
    }
  }

  render() {
    const { email, password, isValid } = this.state;
    const { login } = this.props;
    return (
      <div className="login">
        <section className="login-inputs">
          <input
            data-testid="email-input"
            onChange={ (e) => {
              this.setState({ email: e.target.value });
              this.validInputs();
            } }
            placeholder="E-mail"
            type="text"
            value={ email }
          />
          <input
            data-testid="password-input"
            onChange={ (e) => {
              this.setState({ password: e.target.value });
              this.validInputs();
            } }
            placeholder="Password"
            type="text"
            value={ password }
          />
        </section>
        <section className="link">
          <Link to="/carteira">
            <button
              data-testid="btn-login"
              onClick={ () => login({ email, password }) }
              type="button"
              disabled={ isValid }
            >
              Entrar
            </button>
          </Link>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(dataLogin(data)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
