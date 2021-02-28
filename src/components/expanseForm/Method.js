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
          id={ method }
          value={ method }
          onChange={ onChange }
        >
          <option
            id="Dinheiro"
            value="Dinheiro"
          >
            Dinheiro
          </option>
          <option
            id="Cartão de crédito"
            value="Cartão de crédito"
          >
            Cartão de crédito
          </option>
          <option
            id="Cartão de débito"
            value="Cartão de débito"
          >
            Cartão de débito
          </option>
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
