import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AddexpenseOne from './AddexpenseOne';
import AddexpenseTwo from './AddexpenseTwo';

import { reqForAddExpenseThunk } from '../actions';

const INITIAL_STATE = {
  expenseAmount: '0',
  description: '',
  selectedCoin: 'Dólar Comercial',
  paymentMethod: 'Dinheiro',
  tag: 'Alimentação',
};

class Addexpense extends Component {
  constructor() {
    super();

    this.state = INITIAL_STATE;

    this.handleChange = this.handleChange.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.checkInfo = this.checkInfo.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  clearFields() {
    this.setState(INITIAL_STATE);
  }

  checkInfo(params) {
    const { saveExpense } = this.props;
    if (params.expenseAmount !== 0 && params.description) {
      saveExpense(params);
      this.clearFields();
    }
  }

  render() {
    const { handleChange, checkInfo } = this;
    const { expenseAmount, description, selectedCoin, paymentMethod, tag } = this.state;
    const infoOne = { expenseAmount, handleChange, selectedCoin };
    const infoTwo = { paymentMethod, description, tag, handleChange };
    const { id } = this.props;
    const expenseId = (id.length !== 0) ? id.length : 0;

    return (
      <>
        <AddexpenseOne infos={ infoOne } />

        <AddexpenseTwo infos={ infoTwo } />
        <button
          type="button"
          onClick={ () => {
            checkInfo({
              id: expenseId,
              ...this.state,
            });
          } }
        >
          Adicionar despesa
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expense) => dispatch(reqForAddExpenseThunk(expense)),
});

const mapStateToProps = ({ wallet: { expenses } }) => ({
  id: expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Addexpense);

Addexpense.propTypes = {
  saveExpense: PropTypes.func.isRequired,
  id: PropTypes.arrayOf(PropTypes.object).isRequired,
};
