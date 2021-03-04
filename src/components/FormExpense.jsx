import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import InputWallet from './Input-wallet';
import { addExpensewithCurrencies as walletActions } from '../actions/wallet.action';

class FormExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleAddExpense() {
    const { addExpenseWithCurrencies } = this.props;
    addExpenseWithCurrencies(this.state);
  }

  renderInputs() {
        const { value, description } = this.state;
    return (
      <>
        <InputWallet
          name="value"
          label="Valor"
          onChange={ this.handleChange }
          value={ value }
        />
        <InputWallet
          name="description"
          label="Descrição"
          onChange={ this.handleChange }
          value={ description }
        />
      </>
    );
  }

  render() {
    const { currencies } = this.props;
    const { currency, method, tag } = this.state;
    return (
      <section>
        <form className="form-box">
          <fieldset>
            {this.renderInputs()}
            <InputWallet
              name="currency"
              type="select"
              value={ currency }
              label="Moeda"
              options={ currencies }
              onChange={ this.handleChange }
            />
            <InputWallet
              name="method"
              type="select"
              value={ method }
              label="Método de Pagamento"
              options={ ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'] }
              onChange={ this.handleChange }
            />
            <InputWallet
              name="tag"
              type="select"
              value={ tag }
              label="Tag"
              options={ ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'] }
              onChange={ this.handleChange }
            />
            <button
              type="button"
              onClick={ this.handleAddExpense }
            >
              Adicionar despesa
            </button>
          </fieldset>
        </form>
      </section>
    );
  }
}

FormExpense.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpenseWithCurrencies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDipatchToProps = (dispatch) => ({
  addExpenseWithCurrencies: bindActionCreators(walletActions, dispatch),
});

export default connect(mapStateToProps, mapDipatchToProps)(FormExpense);
