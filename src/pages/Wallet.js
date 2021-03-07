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
  }

  componentDidMount() {
    const { currenciesFetch } = this.props;
    currenciesFetch();
  }

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
          <label htmlFor="value-input">
            <span>Valor: </span>
            <input type="text" id="value-input" data-testid="value-input" />
          </label>
          <label htmlFor="description-input">
            <span>Descrição: </span>
            <input type="text" id="description-input" data-testid="description-input" />
          </label>
          <label htmlFor="currency-input">
            <span>Moeda: </span>
            <select id="currency-input" data-testid="currency-input">
              {currencies
                .map((data) => (
                  <option key={ data[0] } data-testid={ data[0] }>{data[0]}</option>
                ))}
            </select>
          </label>
          <label htmlFor="method-input">
            <span>Método de pagamento: </span>
            <select id="method-input" data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            <span>Categoria: </span>
            <select id="tag-input" data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ () => addExpense(this.state) }>Adicionar despesa</button>
        </form>
      </>
    );
  }

  render() {
    return (
      <div>
        {this.walletForm()}
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
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.array).isRequired,
  currenciesFetch: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
