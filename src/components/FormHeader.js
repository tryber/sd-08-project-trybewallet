import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FormHeader extends React.Component {
  getTotal() {
    const { expenses } = this.props;
    const totalExpense = expenses.reduce(
      (total, each) => {
        const { value, currency, exchangeRates } = each;
        const rate = parseFloat(exchangeRates[currency].ask);
        return total + (parseFloat(value) * rate);
      },
      0,
    );

    return totalExpense.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <>
        <header data-testid="email-field">{email}</header>
        <div data-testid="total-field">
          R$
          {' '}
          {Math.round(this.getTotal() * 100) / 100}
        </div>
        <div data-testid="header-currency-field">BRL</div>
      </>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(FormHeader);

FormHeader.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
