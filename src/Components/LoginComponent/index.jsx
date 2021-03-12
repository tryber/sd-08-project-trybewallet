import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormLogin extends Component {
  render() {
    const { handleChange, validateImputs, handleWallet } = this.props;
    return (
      <div>
        <label htmlFor="userEmail">
          <input
            id="userEmail"
            placeholder="Email"
            name="email"
            data-testid="email-input"
            type="text"
            onChange={ (event) => handleChange(event) }
          />
        </label>
        <label htmlFor="userPassword">
          <input
            id="userPassword"
            placeholder="Password"
            name="password"
            data-testid="password-input"
            type="password"
            onChange={ (event) => handleChange(event) }
          />

        </label>
        <button
          disabled={ validateImputs() }
          type="button"
          onClick={ () => handleWallet() }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default FormLogin;

FormLogin.propTypes = {
  validateImputs: PropTypes.func.isRequired,
  handleWallet: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};
