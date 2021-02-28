import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Payments extends Component {
  render() {
    const { datatestid, name, onChange, value } = this.props;
    return (
      <select
        value={ value }
        onChange={ onChange }
        name={ name }
        data-testid={ datatestid }
      >
        <option>Dinheiro</option>
        <option>Cartão de crédito</option>
        <option>Cartão de débito</option>
      </select>
    );
  }
}

Payments.propTypes = {
  datatestid: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Payments;
