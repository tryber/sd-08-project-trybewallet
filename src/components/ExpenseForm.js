import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  actionFetchCurrenciesData,
  actionAddExpenses,
} from '../actions/walletActions';

import Value from './expanseForm/Value';
import Currency from './expanseForm/Currency';
import Method from './expanseForm/Method';
import Tag from './expanseForm/Tag';
import Description from './expanseForm/Description';
import ExpenseTable from './ExpenseTable';

import './ExpenseForm.css';

class expenseForm extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      // currentRate: {},
    };
  }

  componentDidMount() {
    const { fetchCurrenciesData } = this.props;
    fetchCurrenciesData();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { fetchCurrenciesData, addExpense } = this.props;
    await fetchCurrenciesData();
    addExpense(this.state);
    this.setState({
      value: '',
    });
  }

  render() {
    const {
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;

    return (
      <div>
        <form className="expense-form" onSubmit={ this.handleSubmit }>
          <Value value={ value } onChange={ this.handleChange } />
          <Currency value={ currency } onChange={ this.handleChange } />
          <Method method={ method } onChange={ this.handleChange } />
          <Tag tag={ tag } onChange={ this.handleChange } />
          <Description description={ description } onChange={ this.handleChange } />
          <div>
            <button
              type="button"
              onClick={ this.handleSubmit }
            >
              Adicionar despesa
            </button>
          </div>
        </form>
        <ExpenseTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesData: () => dispatch(actionFetchCurrenciesData()),
  addExpense: (expense) => dispatch(actionAddExpenses(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(expenseForm);

expenseForm.propTypes = {
  fetchCurrenciesData: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
};
