import React from 'react';
import PropTypes from 'prop-types';

export default function LoginButton({ disableButton, login }) {
  return (
    <div className="d-flex w-100 justify-content-center">
      <button
        className="btn btn-primary w-25"
        type="submit"
        disabled={ disableButton }
        onClick={ login }
      >
        Entrar
      </button>
    </div>
  );
}

LoginButton.propTypes = {
  login: PropTypes.func.isRequired,
  disableButton: PropTypes.bool.isRequired,
};
