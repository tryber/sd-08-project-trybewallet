import React, { Component } from 'react';
import PropTypes from 'prop-types';

const methodList = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

export default class SelectMethod extends Component {
  render() {
    const { handleChange } = this.props;
    return (
      <select name="method" data-testid="method-input" onChange={ handleChange }>
        {
          methodList.map((method) => (
            <option
              key={ method }
              data-testid={ method }
            >
              {method}
            </option>))
        }
      </select>
    );
  }
}

SelectMethod.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
