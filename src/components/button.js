import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Button extends React.Component {
  render() {
    const { isEmailValid, isPasswordValid } = this.props;
    return (
      <div>
        <Link to="/carteira">
          {
            isEmailValid && isPasswordValid
              ? (
                <button type="button">
                  Entrar
                </button>
              )
              : (
                <button disabled type="button">
                  Entrar
                </button>)
          }
        </Link>
      </div>
    );
  }
}

Button.propTypes = {
  isEmailValid: PropTypes.bool.isRequired,
  isPasswordValid: PropTypes.bool.isRequired,
};

export default Button;
