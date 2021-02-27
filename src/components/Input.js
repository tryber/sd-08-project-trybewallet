import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { children, name, datatestid, onChange, value } = this.props;
    return (
      <label htmlFor={ name }>
        { children }
        <input
          value={ value }
          onChange={ onChange }
          name={ name }
          data-testid={ datatestid }
        />
      </label>
    );
  }
}

Input.propTypes = {
  datatestid: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Input;
