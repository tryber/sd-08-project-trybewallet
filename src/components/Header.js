import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.sumOftotalExpenses = this.sumOftotalExpenses.bind(this);
  }

  sumOftotalExpenses() {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, current) => (
      acc + current.value * current.exchangeRates[current.currency].ask
    ), 0);

    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <p>
          <strong>Email:</strong>
          <span data-testid="email-field">{ email }</span>
        </p>
        <p>
          <strong>Despesa Total:</strong>
          <span data-testid="total-field">{ this.sumOftotalExpenses() }</span>
          <strong>Câmbio:</strong>
          <span data-testid="header-currency-field">BRL</span>
        </p>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
