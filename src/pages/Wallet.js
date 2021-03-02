import React from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { fetchCurrencies } from '../actions';
import Header from '../components/Header';
import RegisterExpense from '../components/RegisterExpenses';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      idExpenses: 0,
      valueExpenditure: '0',
      descriptionExpenditure: '',
      currentCoin: 'USD',
      paymentMethod: 'Dinheiro',
      expenditureCategories: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.getExpenses = this.getExpenses.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidMount() {
    const { currencies } = this.props;
    currencies();
  }

  getExpenses() {
    this.setState((state) => ({ idExpenses: state.idExpenses + 1 }));
    const {
      idExpenses,
      valueExpenditure,
      descriptionExpenditure,
      currentCoin,
      paymentMethod,
      expenditureCategories,
    } = this.state;
    return {
      id: idExpenses,
      value: valueExpenditure,
      currency: currentCoin,
      method: paymentMethod,
      tag: expenditureCategories,
      description: descriptionExpenditure,
    };
  }

  resetForm() {
    this.setState({
      valueExpenditure: '0',
      descriptionExpenditure: '',
      currentCoin: 'USD',
      paymentMethod: 'Dinheiro',
      expenditureCategories: 'Alimentação',
    });
  }

  handleChange({ target: { value, name } }) {
    // const valueResult = name === 'valueExpenditure' ? parseInt(value, 10) || 0 : value;
    this.setState({ [name]: value });
  }

  render() {
    const result = this.state;
    return (
      <>
        <Header />
        <RegisterExpense
          { ...result }
          handleChange={ this.handleChange }
          getExpenses={ this.getExpenses }
          resetForm={ this.resetForm }
        />
      </>
    );
  }
}

Wallet.propTypes = {
  currencies: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(fetchCurrencies()),
});

export default connect(null, mapDispatchToProps)(Wallet);
