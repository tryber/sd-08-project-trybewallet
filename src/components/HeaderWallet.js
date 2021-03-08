import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class HeaderWallet extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce((a, b) => a + b.valueConverted, 0);

    return (
      <div>
        <p data-testid="email-field">
          {email}
        </p>
        <p data-testid="total-field">{ total }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

HeaderWallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ user: { email }, wallet }) => ({
  email,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(HeaderWallet);
