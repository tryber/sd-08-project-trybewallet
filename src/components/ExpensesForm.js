import React from 'react';
import apiCurrencies from '../services/api';

class ExpensesForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: [],
    };
  }

  componentDidMount() {
    this.getCurrencies();
  }

  async getCurrencies() {
    const currenciesApi = await apiCurrencies();
    const currenciesObject = (Object.keys(currenciesApi));
    currenciesObject.splice(1, 1);
    this.setState({ currencies: currenciesObject });
  }

  creatTagOption() {
    return (
      <>
        <option value="alimentacao">Alimentação</option>
        <option value="lazer">Lazer</option>
        <option value="trabalho">Trabalho</option>
        <option value="transporte">Transporte</option>
        <option value="saude">Saúde</option>
      </>
    );
  }

  creatPaymentMethod() {
    return (
      <>
        <option value="dinheiro">Dinheiro</option>
        <option value="cartao-de-credito">Cartão de crédito</option>
        <option value="cartao-de-debito">Cartão de débito</option>
      </>
    );
  }

  render() {
    const { currencies } = this.state;
    return (
      <div>
        <label htmlFor="value-input">
          Valor:
          <input
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input data-testid="description-input" />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select data-testid="currency-input">
            {currencies.map((cur) => (
              <option
                data-testid={ cur }
                value={ cur }
                key={ cur }
              >
                { cur }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="tag-input">
          Tag:
          <select data-testid="tag-input">
            { this.creatTagOption() }
          </select>
        </label>
        <label htmlFor="method-input">
          Método de Pagamento:
          <select data-testid="method-input">
            { this.creatPaymentMethod() }
          </select>
        </label>
        <button
          data-testid="btn-adicioar-despesa"
          type="button"
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

export default ExpensesForm;
