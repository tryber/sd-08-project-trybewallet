import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { getCurrencies } from '../actions';
import expense from '../data/expense';
import SelectExpense from './WalletForm/SelectExpense';
import Input from './WalletForm/Input';

class WalletExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.renderSelects = this.renderSelects.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleResetField = this.handleResetField.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState((state) => ({
      ...state, [name]: value,
    }));
  }

  handleResetField() {
    const resetState = { value: '', description: '', currency: '', method: '', tag: '' };
    this.setState(resetState);
  }

  handleClick() {
    const validatoField = Object.values(this.state).every((field) => field.length !== 0);
    const { addExpense } = this.props;
    if (validatoField) {
      addExpense(this.state);
      this.handleResetField();
    }
  }

  renderSelects() {
    const { currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <>
        <SelectExpense
          value={ currency }
          data-testid="currency-input"
          type="text"
          name="currency"
          id="id-currency"
          placeholder="valor"
          options={ currencies }
          onChange={ this.handleChange }
        />
        <SelectExpense
          value={ method }
          title="método de pagamento"
          data-testid="method-input"
          type="text"
          name="method"
          id="id-method"
          options={ expense.method }
          onChange={ this.handleChange }
        />
        <SelectExpense
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
        {this.renderSelects()}
        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </main>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: bindActionCreators(getCurrencies, dispatch),
});

WalletExpense.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  addExpense: PropTypes.func.isRequired,
};

WalletExpense.defaultProps = {
  currencies: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletExpense);
