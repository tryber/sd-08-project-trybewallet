import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Payments extends Component {
  render() {
    const { datatestid, name, onChange } = this.props;
    return (
      <select onChange={ onChange } name={ name } data-testid={ datatestid }>
        <option>Dinheiro</option>
        <option>Cartão de crédito</option>
        <option>Cartão de débito</option>
      </select>
    );
  }
}

Payments.propTypes = {
  datatestid: PropTypes.string.isRequired,
};

export default Payments;
