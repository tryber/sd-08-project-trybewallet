import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputDescription extends Component {
  render() {
    const { value, changeInput } = this.props;

    return (
      <label htmlFor="description">
        Descrição:
        <input
          name="description"
          type="text"
          value={ value }
          onChange={ changeInput }
          data-testid="description-input"
          className="expenses-input"
        />
      </label>
    );
  }
}

InputDescription.propTypes = {
  value: PropTypes.string.isRequired,
  changeInput: PropTypes.func.isRequired,
};

export default InputDescription;
