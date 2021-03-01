import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();
    this.getTotalExpenses = this.getTotalExpenses.bind(this);
  }

  getTotalExpenses() {
    const { allExpenses } = this.props;
    if(allExpenses.length!==0) {
      const quote = allExpenses.map(
        (element) => element.value
          * element.exchangeRates[element.currency].ask,
      );
      return (quote
        .reduce((total, nextElement) => total + nextElement, 0)).toFixed(2);
    } 
    return 0; 
  }

  render() {
    const {
      userInfos: { email },
    } = this.props;
    return (
      <div>
        TrybeWallet
        <span data-testid="email-field">{email}</span>
        <span data-testid="total-field">
          {this.getTotalExpenses()}
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

Header.propTypes = {
  userInfos: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  allExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  userInfos: state.user,
  allExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
