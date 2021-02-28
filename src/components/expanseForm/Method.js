import React from 'react';
import PropTypes from 'prop-types';

class Method extends React.Component {
  render() {
    const { method, onChange } = this.props;
    return (
      <label className="div-form" htmlFor="method">
        Método de pagamento:
        <select
          name="method"
          data-testid="method-input"
          value={ method }
          onChange={ onChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }
}

export default Method;

Method.propTypes = {
  method: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
