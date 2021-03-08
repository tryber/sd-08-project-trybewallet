import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import currenciesFetchAction from '../actions/currenciesFetchAction';
import addExpenseAction from '../actions/addExpenseAction';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 2,
      description: 'qualquer coisa',
      currency: 'USD',
      method: 'Cartão de Débito',
      tag: 'Lazer',
    };
    this.walletForm = this.walletForm.bind(this);
    this.walletTable = this.walletTable.bind(this);
  }

  componentDidMount() {
    const { currenciesFetch } = this.props;
    currenciesFetch();
  }

  // propriedade ASK da moeda

  walletForm() {
    const { email, currencies, addExpense } = this.props;
    return (
      <>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <span>Valor: </span>
          <input type="text" id="value-input" data-testid="value-input" />

          <span>Descrição: </span>
          <input type="text" id="description-input" data-testid="description-input" />

          <span>Moeda: </span>
          <select id="currency-input" data-testid="currency-input">
            {currencies
              .map((data) => (
                <option key={ data[0] } data-testid={ data[0] }>{data[0]}</option>
              ))}
          </select>

          <span>Método de pagamento: </span>
          <select id="method-input" data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>

          <span>Categoria: </span>
          <select id="tag-input" data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button
            type="button"
            onClick={ () => addExpense(this.state) }
          >
            Adicionar despesa
          </button>
        </form>
      </>
    );
  }

  walletTable() {
    const { expenses } = this.props;
    //  Referência dos cálculos: Arnaelcio Gomes - T8;
    this.change = (currentAsk) => (Math.floor((currentAsk * 100) / 100).toFixed(2));
    this.converted = (value, ask) => {
      const result = value * ask;
      return (Math.floor(result * 100) / 100).toFixed(2);
    };

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => {
            const actualCurrency = expense.exchangeRates[expense.currency].ask;
            return (
              <tr key={ index }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{this.change(actualCurrency)}</td>
                <td>{this.converted(expense.value, actualCurrency)}</td>
                <td>Real</td>
                <td>
                  <button type="button">Editar</button>
                  <button type="button">Excluir</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div>
        {this.walletForm()}
        {this.walletTable()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currenciesFetch: () => dispatch(currenciesFetchAction()),
  addExpense: (expense) => dispatch(addExpenseAction(expense)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.array).isRequired,
  expenses: PropTypes.objectOf(PropTypes.object).isRequired,
  currenciesFetch: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
