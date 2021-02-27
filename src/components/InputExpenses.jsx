import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputExpenses extends Component {
  render() {
    const { value, changeInput } = this.props;

    return (
      <label htmlFor="value">
        Valor:
        <input
          name="value"
          type="text"
          value={ value }
          onChange={ changeInput }
          data-testid="value-input"
        />
      </label>
    );
  }
}

InputExpenses.propTypes = {
  value: PropTypes.string.isRequired,
  changeInput: PropTypes.func.isRequired,
};

export default InputExpenses;
