import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import FormWallet from '../components/FormWallet';
import Table from '../components/Table';
import { fetchCurrency as fetchCurrencyAction,
  saveExpense as saveExpenseAction } from '../actions';
import currenciesAPI from '../services/currenciesAPI';

const INITIAL_STATE = {
  id: 0,
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Cartão de crédito',
  tag: 'Lazer',
  total: 0,
};
class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
    };

    this.handleInput = this.handleInput.bind(this);
    this.addExpenciesToStore = this.addExpenciesToStore.bind(this);
    this.totalExpenses = this.totalExpenses.bind(this);
  }

  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  totalExpenses(total, value, currency, exchangeRates) {
    const rate = parseFloat(exchangeRates[currency].ask);
    const valueconvertedToBRL = parseFloat(value) * rate;
    return parseFloat(total) + valueconvertedToBRL;
  }

  async addExpenciesToStore(event) {
    event.preventDefault();
    const { id,
      value,
      description,
      currency,
      method,
      tag,
      total,
    } = this.state;

    const { saveExpense } = this.props;
    const exchangeRates = await currenciesAPI();
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };

    saveExpense(expense);
    this.setState({
      ...INITIAL_STATE,
      id: id + 1,
      total: this.totalExpenses(total, value, currency, exchangeRates),
    });
  }

  render() {
    const { emailUser } = this.props;
    const { total, description, value } = this.state;
    return (
      <div>
        <Header email={ emailUser } total={ total } />
        <FormWallet
          handleInput={ this.handleInput }
          addExpenciesToStore={ this.addExpenciesToStore }
          value={ value }
          description={ description }
        />
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
});

const mapdispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchCurrencyAction()),
  saveExpense: (expense) => dispatch(saveExpenseAction(expense)),
});

Wallet.propTypes = {
  emailUser: PropTypes.string.isRequired,
  fetchCurrency: PropTypes.func.isRequired,
  saveExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapdispatchToProps)(Wallet);
