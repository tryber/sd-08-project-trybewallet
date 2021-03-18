import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.calculateTotalExpenses = this.calculateTotalExpenses.bind(this);
  }

  calculateTotalExpenses() {
    const { expenses } = this.props;
    const totalExpenses = expenses
      .reduce((accumulator, expense) => (
        accumulator
        + (
          Number(expense.value) * Number(expense.exchangeRates[expense.currency].ask)
        )
      ), 0);
    return totalExpenses.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <section>
        <p data-testid="email-field">{`Email: ${email}`}</p>
        <div>
          <span
            data-testid="total-field"
          >
            {`Despesa total: R$ ${this.calculateTotalExpenses()} `}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </section>
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
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.shape({
      code: PropTypes.string,
      name: PropTypes.string,
      ask: PropTypes.number,
    }),
  })).isRequired,
};

export default connect(mapStateToProps, null)(Header);
