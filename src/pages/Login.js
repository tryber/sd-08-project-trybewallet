import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      checkedValid: true,
    };
    this.updates = this.updates.bind(this);
    this.validation = this.validation.bind(this);
  }

  updates(field, newValue) {
    this.setState({ [field]: newValue });
    this.validation();
  }

  validation() {
    const { email, password } = this.state;

    const mascEmail = new RegExp('[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$', 'gm');
    const mascPassword = new RegExp('^.{5,}$');

    const validEmail = email.match(mascEmail);
    const validPassWord = password.match(mascPassword);

    if (validEmail && validPassWord) {
      return this.setState({ checkedValid: false });
    }
    return this.setState({ checkedValid: true });
  }

  render() {
    const { email, password, checkedValid } = this.state;
    const { fieldEmail } = this.props;

    return (
      <div>
        <p>Login</p>
        <input
          type="text"
          onChange={ (event) => this.updates('email', event.target.value) }
          data-testid="email-input"
        />
        <p>Senha</p>
        <input
          type="password"
          onChange={ (event) => this.updates('password', event.target.value) }
          data-testid="password-input"
        />
        <p>
          <Link to="/carteira">
            <button
              disabled={ checkedValid }
              type="button"
              onClick={ () => fieldEmail({ email, password }) }
            >
              Entrar

            </button>
          </Link>
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fieldEmail: (email) => dispatch(saveEmail(email)),
});

Login.propTypes = {
  fieldEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
