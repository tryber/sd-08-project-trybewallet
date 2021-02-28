import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletHeader from '../components/WalletHeader';
import { WalletForms } from '../components/WalletForms';
import { addExpense, fetchCurrencies } from '../actions/wallet';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      currency: '',
      method: '',
      tag: '',
      description: '',
      // exchangeRates: '',
      total: 0,
    };
  }

  componentDidMount() {
    const { fetchCurr } = this.props;
    console.log(fetchCurr);
    fetchCurr();
  }

  handleInput(position, value) {
    this.setState({
      [position]: value,
    });
  }

  clearState() {
    this.setState({
      value: 0,
      currency: '',
      method: '',
      tag: '',
      description: '',
      // exchangeRates: '',
      // total: 0,
    });
  }

  createAndAddExpense() {
    const { id, value, currency, method, tag, description, total } = this.state;
    const { currencies, addExp, fetchCurr } = this.props;
    console.log(currencies);
    console.log(currency);
    fetchCurr();
    const expense = {
      id: parseInt(id, 10),
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: currencies,
      total: parseInt(total, 10) + parseInt(value, 10),
    };
    addExp(expense);
    this.setState({
      id: parseInt(id, 10) + 1, total: parseInt(total, 10) + parseInt(value, 10),
    });
    this.clearState();
  }

  render() {
    const { total } = this.state;
    const { email, fetchCurr } = this.props;
    return (
      <section>
        <WalletHeader email={ email } total={ total } />
        <WalletForms
          fetchCurr={ fetchCurr }
          handleInput={ (position, value) => this.handleInput(position, value) }
          createAndAddExpense={ () => this.createAndAddExpense() }
        />
      </section>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurr: () => dispatch(fetchCurrencies()),
  addExp: (expense) => dispatch(addExpense(expense)),
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

// window.onload(fetchCurrencies());
