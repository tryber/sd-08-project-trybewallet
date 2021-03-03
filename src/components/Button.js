import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Button extends React.Component {
  render() {
    const { isEmailValid, isPasswordValid } = this.props;
    return (
      <Link to="/carteira">
        <button
          disabled={ !(isEmailValid && isPasswordValid) }
          type="button"
        >
          Entrar
        </button>
      </Link>
    );
  }
}

Button.propTypes = {
  isEmailValid: PropTypes.bool.isRequired,
  isPasswordValid: PropTypes.bool.isRequired,
};

export default Button;
