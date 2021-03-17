import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';

const PAYMENT_OPTIONS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

const TAGS_OPTIONS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

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
    const { edit } = this.props;
    if (edit[1] === 1) {
      return (
        <div>
          <Header />
          <ExpenseTable />
        </div>
      );
    }
    return (
      <div>
        <Header />
        <ExpenseForm />
        <ExpenseTable />
      </div>
    );
  }
}

Wallet.propTypes = {
  edit: PropTypes.arrayOf(PropTypes.number).isRequired,

};

const mapStateToProps = (state) => ({
  edit: state.wallet.editExpense,
});
export default connect(mapStateToProps)(Wallet);
