import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Payment extends Component {
  render() {
    const { getFields, method } = this.props;
    return (
      <label htmlFor="payment">
        Método de Pagamento:
        <select
          onChange={ getFields }
          name="method"
          data-testid="method-input"
          type="text"
          id="payment"
          value={ method }
        >
          <option>Selecione</option>
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }
}
Payment.propTypes = {
  getFields: PropTypes.func.isRequired,
  method: PropTypes.string.isRequired,
};
export default Payment;
