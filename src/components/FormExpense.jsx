import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrencies } from '../services/requestAPI';
import { fetchCurrencies as fetchCurrenciesAction, actionExpenses } from '../actions';
import FormLabel from './FormLabel';
import FormLabelDescri from './ForlLabelDescri';
import FormSelectMethod from './FormSelectMethod';
import FormSelectTag from './FormSelectTag';
import FormSelectCurrencies from './FormSelectCurrencies';
import '../styles/Form.css';

class FormExpense extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      currency: 'USD',
      method: '',
      tag: '',
      description: '',
      exchangeRates: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addOne = this.addOne.bind(this);
    this.handleArray = this.handleArray.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
    this.handleArray();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  addOne() {
    const { id } = this.state;
    this.setState({ id: id + 1 });
  }

  handleClick() {
    const { showExpenses } = this.props;
    this.addOne();
    showExpenses(this.state);
    this.setState(
      {
        id: 0,
        value: 0,
        currency: 'USD',
        method: '',
        tag: '',
        description: '',
      },
    );
  }

  async handleArray() {
    const { exchangeRates } = this.state;
    const apiAr = await getCurrencies();
    this.setState({
      exchangeRates: apiAr,
    });
  }

  render() {
    const { value, currency, method, tag, description } = this.state;

    return (
      <section className="formContainer">

        <form>

          <FormLabel
            value={ value }
            handleChange={ this.handleChange }
          />
          <FormSelectCurrencies
            currency={ currency }
            handleChange={ this.handleChange }
          />
          <FormSelectMethod
            method={ method }
            handleChange={ this.handleChange }
          />
          <FormSelectTag
            tag={ tag }
            handleChange={ this.handleChange }
          />
          <FormLabelDescri
            description={ description }
            handleChange={ this.handleChange }
          />

          <button type="button" onClick={ this.handleClick }> Adicionar despesa </button>
        </form>
      </section>
    );
  }
}

const mapDispactToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
  showExpenses: (UPexpenses) => dispatch(actionExpenses(UPexpenses)),
  // expense: (expense) => dispatch(actionAddExpensesexpense(expense)),

});

export default connect(null, mapDispactToProps)(FormExpense);
