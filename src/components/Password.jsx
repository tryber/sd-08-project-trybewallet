import React from 'react';
import PropTypes from 'prop-types';

export default function Password({ validatePassword }) {
  return (
    <div className="d-flex flex-row">
      <span className="input-group-text">Email</span>
      <input
        type="password"
        className="form-control"
        data-testid="password-input"
        onChange={ (e) => validatePassword(e) }
      />
    </div>
  );
}

Password.propTypes = {
  validatePassword: PropTypes.func.isRequired,
};
