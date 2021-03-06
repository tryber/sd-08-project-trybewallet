import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FormWallet extends React.Component {
  constructor(props) {
    super(props);
    this.renderInputValue = this.renderInputValue.bind(this);
    this.renderInputCurrencie = this.renderInputCurrencie.bind(this);
    this.renderInputPaymentMethod = this.renderInputPaymentMethod.bind(this);
    this.renderInputCategory = this.renderInputCategory.bind(this);
    this.renderInputDescription = this.renderInputDescription.bind(this);
    this.renderInputButton = this.renderInputButton.bind(this);
  }

  renderInputValue() {
    const { handleInput, value } = this.props;
    return (
      <th>
        <label htmlFor="value">
          valor:
          <input
            data-testid="value-input"
            type="number"
            name="value"
            step="0.01"
            onChange={ (event) => handleInput(event) }
            value={ value }
          />
        </label>
      </th>
    );
  }

  renderInputCurrencie() {
    const { currencies, handleInput } = this.props;
    return (
      <th>
        <label htmlFor="currency-input">
          Currencies:
          <select
            id="currency-input"
            name="currency"
            data-testid="currency-input"
            onChange={ (event) => handleInput(event) }
          >
            {currencies.map((currency, index) => (
              currency !== 'USDT' && (
                <option
                  data-testid={ currency }
                  key={ index }
                  value={ currency }
                >
                  {currency}
                </option>
              )
            ))}
          </select>
        </label>
      </th>
    );
  }

  renderInputPaymentMethod() {
    const { handleInput } = this.props;
    return (
      <th>
        <label htmlFor="method-input">
          Método de pagamento:
          <select
            id="method-input"
            name="method"
            data-testid="method-input"
            onChange={ handleInput }
          >
            <option>Cartão de crédito</option>
            <option>Dinheiro</option>
            <option>Cartão de débito</option>
          </select>
        </label>
      </th>
    );
  }

  renderInputCategory() {
    const { handleInput } = this.props;
    return (
      <th>
        <label htmlFor="tag-input">
          Tag:
          <select
            id="tag-input"
            name="tag"
            data-testid="tag-input"
            onChange={ (event) => handleInput(event) }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Transporte</option>
            <option>Saúde</option>
            <option>Trabalho</option>
          </select>
        </label>
      </th>
    );
  }

  renderInputDescription() {
    const { handleInput, description } = this.props;
    return (
      <th>
        <label htmlFor="description">
          Descrição:
          <input
            name="description"
            type="text"
            data-testid="description-input"
            onChange={ (event) => handleInput(event) }
            value={ description }
          />
        </label>
      </th>
    );
  }

  renderInputButton() {
    const { addExpenciesToStore } = this.props;
    return (
      <th>
        <label htmlFor="button">
          <input
            type="button"
            name="button"
            value="Adicionar despesa"
            onClick={ addExpenciesToStore }
          />
        </label>
      </th>
    );
  }

  render() {
    return (
      <form>
        <fieldset>
          <table>
            <thead>
              <tr>
                {this.renderInputValue()}
                {this.renderInputCurrencie()}
                {this.renderInputPaymentMethod()}
                {this.renderInputCategory()}
                {this.renderInputDescription()}
                {this.renderInputButton()}
              </tr>
            </thead>
          </table>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

FormWallet.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  addExpenciesToStore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(FormWallet);
