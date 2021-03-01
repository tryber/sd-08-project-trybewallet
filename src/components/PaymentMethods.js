import React from 'react';
import PropTypes from 'prop-types';

class PaymentMethods extends React.Component {
  render() {
    const { datatestid, name, onChange, value } = this.props;
    return (
      <select
        onChange={ onChange }
        name={ name }
        data-testid={ datatestid }
        value={ value }
      >
        <option>Dinheiro</option>
        <option>Cartão de crédito</option>
        <option>Cartão de débito</option>
      </select>
    );
  }
}

PaymentMethods.propTypes = {
  datatestid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default PaymentMethods;
