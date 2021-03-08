import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getPayments } from '../util/constantes';

class SelectMethodPayment extends Component {
  render() {
    const payments = getPayments();
    const { value, onChange } = this.props;
    return (
      <div>
        <label htmlFor="methodPayment">
          Pagamento
          <select
            id="methodPayment"
            name="methodPayment"
            data-testid="method-input"
            value={ value }
            onChange={ onChange }
          >
            {payments.map((payment, index) => (
              <option
                key={ index }
                value={ payment }
              >
                { payment }
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}
SelectMethodPayment.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectMethodPayment;
