import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency } from '../actions';
import FormSelect from './form/formSelect';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [{
        // id: 0,
        value: '',
        // description: "",
        currency: '',
        // method: "",
        // tag: "",
        // exchangeRates: {
        //   currency: {},
        // },
      }],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { fetchCurr } = this.props;
    console.log(fetchCurr);
    fetchCurr();
  }

  handleChange({ target: { name, value } }) {
    console.log(name, value);
    this.setState({
      expenses: [{
        [name]: value,
      }],
    });
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
    const { currency } = this.props;
    const CURRENCY_KEY = Object.keys(currency).filter((curr) => curr !== 'USDT');
    const ARRAY_OF_PAYMENT_METHOD = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const ARRAY_OF_EXPENSES = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { expenses } = this.state;
    console.log(expenses);
    return (
      <form>
        <label data-testid="value-input" htmlFor="value">
          Valor:
          <input
            type="number"
            id="value"
            name="value"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <label data-testid="description-input" htmlFor="descriçao">
          Descrição:
          <input type="text" id="descriçao" name="descriçao" />
        </label>
        <FormSelect
          htmlFor="currency"
          dataArray={ CURRENCY_KEY }
          dataTestid="currency-input"
          label="Moeda:"
          handleChange={ this.handleChange }
        />
        <FormSelect
          htmlFor="method"
          dataArray={ ARRAY_OF_PAYMENT_METHOD }
          dataTestid="method-input"
          label="Método"
        />
        <FormSelect
          htmlFor="category"
          dataArray={ ARRAY_OF_EXPENSES }
          dataTestid="tag-input"
          label="Tag:"
        />
        <button type="button">Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurr: () => dispatch(fetchCurrency()),
});

Form.propTypes = {
  fetchCurr: PropTypes.func,
  currency: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
