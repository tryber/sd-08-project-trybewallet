import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  // constructor() {
  //   super();

  //   this.getTotalExpenses = this.getTotalExpenses.bind(this);
  // }

  // getTotalExpenses() {
  //   const { expenses } = this.props;
  //   const totalExpenses = expenses.reduce((acc, current) => {
  //   }, 0);
  // }

  render() {
    const { email } = this.props;
    return (
      <header>
        <span data-testid="email-field">{`Email: ${email}`}</span>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  // expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
};
