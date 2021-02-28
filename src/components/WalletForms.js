import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense } from '../actions/wallet';
import FormsInputs from './FormsInputs';
import FormsSelectCatergories from './FormsSelectCategories';
import FormsSelectCurrency from './FormsSelectCurrency';
import FormsSelectMethod from './FormsSelectMethod';

export class WalletForms extends Component {
  render() {
    const { handleInput, createAndAddExpense } = this.props;
    return (
      <form>
        <fieldset>
          <FormsInputs handleInput={ handleInput } />
          <FormsSelectCurrency handleInput={ handleInput } />
          <FormsSelectMethod handleInput={ handleInput } />
          <FormsSelectCatergories handleInput={ handleInput } />
          <button
            type="button"
            onClick={ () => createAndAddExpense() }
          >
            Adicionar despesa
          </button>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExp: (expense) => dispatch(addExpense(expense)),
});

WalletForms.propTypes = {
  handleInput: PropTypes.func,
  addExp: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForms);
