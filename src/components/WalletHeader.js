import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletHeader extends Component {
  render() {
    const { emailStore, expensesStore } = this.props;

    // expensesSum() {
    //   // console.log(expenses.valueExpenses);

    // }

    return (
      <header>
        <ul>
          <li data-testid="email-field">{`Usuário Logado: ${emailStore}`}</li>
          <li data-testid="total-field">Total: R$0 </li>
          <li data-testid="header-currency-field">Câmbio: BRL </li>
        </ul>
      </header>
    );
  }
}

WalletHeader.propTypes = {
  emailStore: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  emailStore: state.loginUserReducer.email,
  expensesStore: state.walletReducer.expenses.objetctExpenses,
});
export default connect(mapStateToProps, null)(WalletHeader);
