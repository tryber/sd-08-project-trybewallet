import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { userLoginFunction } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  validateInput() {
    const { email, password } = this.state;
    const sizePassword = 6;
    const isValidEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    let boolean = true;

    if (isValidEmail !== null && password.length >= sizePassword) {
      boolean = false;
    }
    return boolean;
  }

  render() {
    const { userLogin } = this.props;
    const { email } = this.state;
    return (
      <>
        <label htmlFor="email">
          Email
          <input
            type="text"
            name="email"
            onChange={ this.handleChange }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="senha">
          Senha
          <input
            type="password"
            name="password"
            onChange={ this.handleChange }
            data-testid="password-input"
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ this.validateInput() }
            onClick={ () => userLogin(email) }
          >
            ENTRAR
          </button>
        </Link>
      </>
    );
  }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (email) => dispatch(
    userLoginFunction(email),
  ),
});

export default connect(null, mapDispatchToProps)(Login);
