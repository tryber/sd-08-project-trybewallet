import React from 'react';
import propTypes from 'prop-types';

class Form extends React.Component {
  currencyInput() {
    const { currencies, state, onChange } = this.props;
    return (
      <label htmlFor="currency" className="coin-drop">
        Moeda:
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ onChange }
          id="currency"
          value={ state.currency }
        >
          { currencies
            .map((coin) => (
              <option
                key={ coin }
                data-testid={ coin }
              >
                {coin}
              </option>
            ))}
        </select>
      </label>
    );
  }

  tagInput() {
    const { state, onChange } = this.props;
    return (
      <label htmlFor="tag" className="tag-drop">
        Tag:
        <select
          data-testid="tag-input"
          name="tag"
          onChange={ onChange }
          id="tag"
          value={ state.tag }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }

  methodInput() {
    const { state, onChange } = this.props;
    return (
      <label htmlFor="method" className="payment-drop">
        Metodo de pagamento:
        <select
          data-testid="method-input"
          name="method"
          onChange={ onChange }
          id="method"
          value={ state.method }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }

  render() {
    const { onChange, state } = this.props;
    return (
      <>
        <label htmlFor="value" className="input-value">
          Valor:
          <input
            type="number"
            data-testid="value-input"
            name="value"
            onChange={ onChange }
            value={ state.value }
          />
        </label>
        <label htmlFor="description" className="input-description">
          Descrição:
          <input
            type="text"
            name="description"
            data-testid="description-input"
            onChange={ onChange }
            value={ state.description }
          />
        </label>
        { this.currencyInput() }
        { this.methodInput() }
        { this.tagInput() }
      </>
    );
  }
}

Form.propTypes = {
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
  state: propTypes.shape({
    id: propTypes.number.isRequired,
    value: propTypes.node.isRequired,
    description: propTypes.string.isRequired,
    currency: propTypes.string.isRequired,
    method: propTypes.string.isRequired,
    tag: propTypes.string.isRequired,
  }).isRequired,
  onChange: propTypes.func.isRequired,
};

export default Form;
