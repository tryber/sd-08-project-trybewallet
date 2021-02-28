import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      changeTotal: false,
    };
    this.toggleTotal = this.toggleTotal.bind(this);
  }

  componentDidUpdate(prevProps) {
    const interval = 200;
    const { changeTotal } = this.state;
    const { expenses: prevExpenses } = prevProps;
    const { expenses } = this.props;
    if (expenses.length !== prevExpenses.length) this.toggleTotal(true);
    else if (changeTotal === true) setTimeout(() => this.toggleTotal(false), interval);
  }

  toggleTotal(value) {
    this.setState({
      changeTotal: value,
    });
  }

  render() {
    const { changeTotal } = this.state;
    const { email, expenses } = this.props;
    const total = expenses
      .reduce(
        (acc, { value, currency, exchangeRates }) => (
          acc + (value * exchangeRates[currency].ask)
        ), 0,
      );

    return (
      <header>
        <span data-testid="email-field">{`Email: ${email}`}</span>
        <span>TrybeWallet</span>
        <div className="container">
          <span data-testid="total-field" className={ changeTotal ? 'animate' : '' }>
            {total}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
