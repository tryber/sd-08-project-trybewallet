import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      currency: 'BRL',
    };
  }

  componentDidUpdate() {
    this.updateTotal();
  }

  updateTotal() {
    const { total } = this.state;
    const { expenses } = this.props;
    // console.log(expenses);
    const totalCalculated = expenses.reduce((prev, current) => {
      // console.log(prev);
      // console.log(current);
      const { value, currency, exchangeRates } = current;
      return prev + value * exchangeRates[currency].ask;
    }, 0);

    if (total !== totalCalculated) {
      this.setState({ total: totalCalculated });
    }
  }

  render() {
    const { stateEmail } = this.props;
    const { total, currency } = this.state;

    return (
      <div className="header-component">
        <div data-testid="email-field">
          Email:
          { stateEmail }
        </div>
        <div data-testid="total-field">
          Despesa total:
          { total }
        </div>
        <div data-testid="header-currency-field">
          Moeda:
          { currency }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stateEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  stateEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
