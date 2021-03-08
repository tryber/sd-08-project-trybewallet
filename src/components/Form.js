import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency, saveData, saveTotal } from '../actions';
import FormSelect from './form/formSelect';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      currency: '',
      // id: 0,
      description: '',
      method: '',
      tag: '',
      // exchangeRates: {
      //   currency: {},
      // },
      // }],
      expense: [],
    };
  }

  componentDidMount() {
    const { fetchCurr } = this.props;
    // console.log(fetchCurr);
    fetchCurr();
  }

  // handleChange() {
  //   const { expense } = this.state;
  //   console.log(name, value);
  //   this.setState({
  //     expenses: [...expense, {
  //       [name]: value,
  //     }],
  //   });
  // }
  addExpense() {
    const { value, currency, description, method, tag, expense } = this.state;
    const { fetchCurr, saveDt, currencies } = this.props;
    fetchCurr();
    const exp = { value, currency, description, method, tag, currencies };
    this.setState({
      expense: [...expense, exp],
    });
    // console.log(sum + parseFloat(value) * parseFloat(converction.ask));
    saveDt(exp);
  }

  handleChange({ target: { name, value } }) {
    return this.setState({
      [name]: value,
    });
  }

  inputValue() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor:
        <input
          data-testid="value-input"
          type="number"
          value={ value }
          id="value"
          name="value"
          onChange={ (e) => this.handleChange(e) }
        />
      </label>
    );
  }

  inputDescription() {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          data-testid="description-input"
          type="text"
          value={ description }
          name="description"
          onChange={ (e) => this.handleChange(e) }
        />
      </label>
    );
  }

  // handleCurrency({ target: { value } }) {
  //   const { currency } = this.props;
  //   this.setState({
  //     expenses: [{
  //       exchangeRates: {
  //         [value]: currency[value],
  //       },
  //     }],
  //   });
  // }
  render() {
    const { currencies } = this.props;
    const { currency, method, tag } = this.state;
    const CURRENCY_KEY = Object.keys(currencies).filter((curr) => curr !== 'USDT');
    const ARRAY_OF_PAYMENT_METHOD = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const ARRAY_OF_EXPENSES = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form>
        {this.inputValue()}
        {this.inputDescription()}
        <FormSelect
          htmlFor="currency"
          dataArray={ CURRENCY_KEY }
          value={ currency }
          dataTestid="currency-input"
          label="Moeda:"
          handleChange={ (e) => this.handleChange(e) }
        />
        <FormSelect
          htmlFor="method"
          dataArray={ ARRAY_OF_PAYMENT_METHOD }
          value={ method }
          dataTestid="method-input"
          label="Método"
          handleChange={ (e) => this.handleChange(e) }
        />
        <FormSelect
          htmlFor="tag"
          dataArray={ ARRAY_OF_EXPENSES }
          value={ tag }
          dataTestid="tag-input"
          label="Tag:"
          handleChange={ (e) => this.handleChange(e) }
        />
        <button
          type="button"
          onClick={ () => this.addExpense() }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.currency.currency,
  // total: state.sum,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurr: () => dispatch(fetchCurrency()),
  saveDt: (expense) => dispatch(saveData(expense)),
  saveSum: (sum) => dispatch(saveTotal(sum)),
});

Form.propTypes = {
  fetchCurr: PropTypes.func,
  currency: PropTypes.array,
}.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(Form);
