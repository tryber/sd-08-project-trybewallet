import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from './Input';
import Select from './Select';
import { getCurrenciesAcronym, fetchCurrencies } from '../services/requests';
import { addExpense, setCurrencies } from '../actions/walletActions';

const FOOD = 'Alimentação';

class ExpenseForm extends React.Component {
  constructor() {
    super();

    this.state = {
      currency: 'USD',
      description: '',
      method: 'Dinheiro',
      tag: FOOD,
      value: '0',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const { setCurrenciesToRedux } = this.props;
    await getCurrenciesAcronym()
      .then((currencies) => setCurrenciesToRedux(currencies));
  }

  async getCurrenciesInfo() {
    return fetchCurrencies();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { addNewExpense, calcTotal, expenses } = this.props;
    const newExpense = { ...this.state };
    const exchangeRates = await fetchCurrencies();

    const idd = expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 0;
    console.log(idd);
    newExpense.id = expenses.length;
    newExpense.exchangeRates = exchangeRates;

    addNewExpense(newExpense);
    calcTotal();

    this.setState({
      // currency: 'USD',
      description: '',
      // method: 'Dinheiro',
      // tag: FOOD,
      value: '0',
    });
  }

  render() {
    const { description, value } = this.state;
    const { currencies } = this.props;
    const allMethods = ['Dinheiro', 'Cartão de débito', 'Cartão de crédito'];
    const allTags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <form>
        <Input
          name="value"
          type="number"
          onChange={ this.handleChange }
          value={ value }
        />
        <Input
          name="description"
          type="text"
          onChange={ this.handleChange }
          value={ description }
        />
        <Select
          name="currency"
          onChange={ this.handleChange }
          options={ currencies }
        />
        <Select
          name="method"
          onChange={ this.handleChange }
          options={ allMethods }
        />
        <Select
          name="tag"
          onChange={ this.handleChange }
          options={ allTags }
        />
        <button
          type="submit"
          onClick={ this.handleSubmit }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  addNewExpense: PropTypes.func.isRequired,
  calcTotal: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    method: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  setCurrenciesToRedux: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addNewExpense: (expense) => dispatch(addExpense(expense)),
  setCurrenciesToRedux: (currencies) => dispatch(setCurrencies(currencies)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
