import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCurrencies as fetchCurrenciesAction,
  addExpense as addExpenseAction,
} from '../actions/index';
import AddExpensesComponent from './AddExpensesComponent';
import TabelaDeGastos from './TabelaDeGastos';

class Wallet extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.renderCurrencies = this.renderCurrencies.bind(this);
    this.calcularDespesa = this.calcularDespesa.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  // componentDidMount() {
  //   const { fetchCurrencies } = this.props;
  //   fetchCurrencies();
  // }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }));
  }

  calcularDespesa() {
    const { expenses } = this.props;
    let total = 0;
    expenses.forEach((c) => {
      total += (Number(c.value) * Number(c.exchangeRates[c.currency].ask));
    });
    return Math.floor(total * 100) / 100;
  }

  renderCurrencies() {
    const { currencies } = this.props;
    return currencies.map((curr) => (
      <option key={ curr } data-testid={ curr }>{ curr }</option>
    ));
  }

  renderHeader() {
    const { email } = this.props;
    return (
      <header>
        <span data-testid="email-field">
          Email:
          { email }
        </span>
        <span data-testid="total-field">
          Despesas:
          { this.calcularDespesa() }
        </span>
        <span data-testid="header-currency-field">Cambio: BRL</span>
      </header>
    );
  }

  render() {
    return (
      <>
        <section>
          { this.renderHeader() }
          {/* { this.renderFormularioDespesas() } */}
          <AddExpensesComponent />
        </section>
        <section>
          <TabelaDeGastos />
        </section>
      </>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  // fetchCurrencies: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object),
};

Wallet.defaultProps = {
  expenses: [],
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
  addExpense: (e) => dispatch(addExpenseAction(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
