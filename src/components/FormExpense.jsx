import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { addExpensewithCurrencies as walletActions } from '../actions/wallet.action';
import InputWallet from './Input-wallet';

const initialState = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class FormExpense extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleAddExpense() {
    const { addExpenseWithCurrencies } = this.props;
    addExpenseWithCurrencies(this.state);
    this.setState((state) => ({
      ...state, ...initialState,
    }));
  }

  renderInputs() {
    const { value, description } = this.state;
    return (
      <>
        <InputWallet
          data-testid="value-input"
          pattern="[0-9]+([\.,][0-9]+)?"
          step="0.01"
          label="Valor"
          value={ value }
          type="number"
          name="value"
          id="id-value"
          onChange={ this.handleChange }
        />
        <InputWallet
          label="Descrição da despesa"
          value={ description }
          data-testid="description-input"
          type="text"
          name="description"
          id="id-description"
          onChange={ this.handleChange }
        />
      </>
    );
  }

  render() {
    const { currencies } = this.props;
    const { currency, method, tag } = this.state;
    return (
      <form className="form-box">
        <fieldset>
          {this.renderInputs()}
          <InputWallet
            label="Moeda"
            value={ currency }
            data-testid="currency-input"
            type="select"
            name="currency"
            id="id-currency"
            options={ currencies }
            onChange={ this.handleChange }
          />
          <InputWallet
            label="Método de pagamento"
            value={ method }
            data-testid="method-input"
            type="select"
            name="method"
            id="id-method"
            onChange={ this.handleChange }
            options={ ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'] }
          />
          <InputWallet
            data-testid="tag-input"
            type="select"
            name="tag"
            id="id-tag"
            label="Tag"
            value={ tag }
            onChange={ this.handleChange }
            options={ [
              'Alimentação',
              'Lazer',
              'Trabalho',
              'Transporte',
              'Saúde',
            ] }
          />
          <button type="button" onClick={ this.handleAddExpense }>
            Adicionar despesa
          </button>
        </fieldset>
      </form>
    );
  }
}

FormExpense.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  addExpenseWithCurrencies: PropTypes.func.isRequired,
};

FormExpense.defaultProps = {
  currencies: [],
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDipatchToProps = (dispatch) => ({
  addExpenseWithCurrencies: bindActionCreators(walletActions, dispatch),
});

export default connect(mapStateToProps, mapDipatchToProps)(FormExpense);
