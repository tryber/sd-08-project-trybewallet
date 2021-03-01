import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { wallet } from '../actions';
import expense from '../data/expense';
import SelectExpense from './WalletForm/SelectExpense';
import Input from './WalletForm/Input';

class WalletExpenseEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.editExpense[0].value,
      description: props.editExpense[0].description,
      currency: props.editExpense[0].currency,
      method: props.editExpense[0].method,
      tag: props.editExpense[0].tag,
    };

    this.renderSelects = this.renderSelects.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState((state) => ({
      ...state, [name]: value,
    }));
  }

  handleClick() {
    const { editExpense, editExpenseButton } = this.props;
    const { id, exchangeRates } = editExpense[0];
    const newExpenseEdit = { ...this.state, id, exchangeRates };
    editExpenseButton(newExpenseEdit);
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
          data-testid="method-input"
          type="text"
          name="method"
          id="id-method"
          options={ expense.method }
          onChange={ this.handleChange }
        />
        <SelectExpense
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
      <main className="walletExpenseEdit">
        <Input
          data-testid="value-input"
          pattern="[0-9]+([\.,][0-9]+)?"
          step="0.01"
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
        <button
          type="button"
          data-testid="edit-btn"
          onClick={ this.handleClick }
        >
          Editar despesa
        </button>
      </main>
    );
  }
}

const mapStateToProps = ({ wallet: { editExpense, currencies } }) => ({
  editExpense,
  currencies,
});

const mapDispatchToProps = (dispatch) => ({
  editExpenseButton: bindActionCreators(wallet.editExpense, dispatch),
});

WalletExpenseEdit.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editExpense: PropTypes.arrayOf(PropTypes.string).isRequired,
  editExpenseButton: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletExpenseEdit);
