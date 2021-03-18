import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';

const INITIAL_STATE = {
  value: '0',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  id: 0,
  tag: 'Alimentação',
};
class Wallet extends React.Component {
  render() {
    const { edit, expenses } = this.props;
    if (edit[1] === 1) {
      const data = expenses.filter((element) => element.id === edit[0])[0];
      const INITIAL_STATE = {
        value: data.value,
        description: data.description,
        currency: data.currency,
        method: data.method,
        id: data.id,
        tag: data.tag,
      };

      return (
        <div>
          <Header />
          <ExpenseForm key={ INITIAL_STATE.value } editState={ INITIAL_STATE } />
          <ExpenseTable />
        </div>
      );
    }
    return (
      <div>
        <Header />
        <ExpenseForm key={ INITIAL_STATE.value } editState={ INITIAL_STATE } />
        <ExpenseTable />
      </div>
    );
  }
}

Wallet.propTypes = {
  edit: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,

};

const mapStateToProps = (state) => ({
  edit: state.wallet.editExpense,
  expenses: state.wallet.expenses,

});

export default connect(mapStateToProps)(Wallet);
