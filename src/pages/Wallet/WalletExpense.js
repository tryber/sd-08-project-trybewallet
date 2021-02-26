import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { currencySymbol, getCurrency } from '../../services/api';
import expense from '../../data/expense';
import Select from './WalletForm/Select';
import Input from './WalletForm/Input';
import { wallet } from '../../actions';
import './style.css';

class WalletExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      cambioSymbol: [],

    };

    this.rednerSelect = this.rednerSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    currencySymbol().then((cambio) => this.setState((state) => ({
      ...state, cambioSymbol: cambio,
    })));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState((state) => ({
      ...state, [name]: value,
    }));
  }

  handleClick() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const { addExpense } = this.props;
    getCurrency().then((data) => {
      const currentCurrency = {
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates: data,
      };
      addExpense(currentCurrency);
    });
  }

  rednerSelect() {
    const { currency, method, tag, cambioSymbol } = this.state;
    return (
      <>
        <Select
          value={ currency }
          data-testid="currency-input"
          type="text"
          name="currency"
          id="id-currency"
          placeholder="valor"
          options={ cambioSymbol }
          onChange={ this.handleChange }
        />
        <Select
          value={ method }
          title="método de pagamento"
          data-testid="method-input"
          type="text"
          name="method"
          id="id-method"
          options={ expense.method }
          onChange={ this.handleChange }
        />
        <Select
          title="tag"
          data-testid="tag-input"
          type="text"
          name="tag"
          id="id-tag"
          options={ expense.tag }
          value={ tag }
          onChange={ this.handleChange }
        />
      </>
    );
  }

  render() {
    const { value, description } = this.state;
    return (
      <main className="walletExpense">
        <Input
          data-testid="value-input"
          value={ value }
          type="number"
          name="value"
          id="id-value"
          placeholder="valor"
          onChange={ this.handleChange }
        />
        <Input
          value={ description }
          data-testid="description-input"
          type="text"
          name="description"
          id="id-description"
          placeholder="descrição da despesa"
          onChange={ this.handleChange }
        />
        {this.rednerSelect()}
        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: bindActionCreators(wallet.addExpense, dispatch),
});

WalletExpense.propTypes = {
  addExpense: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(WalletExpense);
