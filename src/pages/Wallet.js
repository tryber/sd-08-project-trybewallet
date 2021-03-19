import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency } from '../actions';
import ExpenseTable from '../components/ExpenseTable';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      moedas: '',
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      fetching: false,
      fetchingTotal: true,
      totalValue: 0,
    };
    this.renderCurrency = this.renderCurrency.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  getTotalExpenses() {
    const { expenses } = this.props;
    const totalExpenses = expenses.reduce((total, each) => {
      const { value, currency, exchangeRates } = each;
      const rate = parseFloat(exchangeRates[currency].ask);
      return total + parseFloat(value) * rate;
    }, 0);
    return totalExpenses.toFixed(2);
  }

  fetchCurrencies() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        const dataValues = Object.values(data).filter((moeda) => (
          moeda !== 'USDT' && moeda.name !== 'Dólar Turismo'
        ));
        this.setState({ moedas: dataValues, fetching: true });
      });
  }

  handleChange(event) {
    const { target: { name, value } } = event;
    this.setState(
      { [name]: value },
    );
  }

  renderCurrency() {
    const { moedas } = this.state;
    return (
      <div>
        <label htmlFor="currency_input">
          Escolha uma moeda:
          <select
            id="currency_input"
            name="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {moedas.map((moeda, index) => (
              <option
                key={ index }
                value={ moeda.code }
                data-testid={ moeda.code }
              >
                {moeda.code}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }

  renderMethod() {
    return (
      <label htmlFor="method_input">
        Escolha uma forma de pagamento:
        <select
          id="method_input"
          data-testid="method-input"
          name="method"
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderTag() {
    return (
      <label htmlFor="tag_input">
        Catetegoria:
        <select
          id="tag_input"
          data-testid="tag-input"
          name="tag"
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  renderAddButton() {
    const { dispatchStateToStore } = this.props;
    return (
      <button
        type="button"
        onClick={ () => {
          dispatchStateToStore(this.state);
          this.setState({ value: 0, fetchingTotal: false });
        } }
      >
        Adicionar despesa
      </button>
    );
  }

  render() {
    const { fetching, value } = this.state;
    const { userEmail } = this.props;
    return (
      <div>
        TrybeWallet
        <br />
        <span data-testid="email-field">{userEmail}</span>
        <br />
        <p data-testid="total-field">
          {`Despesa Total: R$ ${this.getTotalExpenses()} `}
        </p>
        <p data-testid="header-currency-field">BRL</p>
        <label htmlFor="value_input">
          Despesa:
          <input
            id="value_input"
            type="text"
            name="value"
            value={ value }
            placeholder="Digite a despesa"
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description_input">
          Descrição:
          <input
            id="description_input"
            type="text"
            name="description"
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        {fetching ? this.renderCurrency() : <div>Loading...</div>}
        {this.renderMethod()}
        {this.renderTag()}
        {this.renderAddButton()}
        <br />
        <ExpenseTable />
      </div>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  dispatchStateToStore: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
  calcValues: state.wallet.calcValues,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchStateToStore: (state) => dispatch(fetchCurrency(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
