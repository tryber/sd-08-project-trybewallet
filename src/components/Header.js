import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { expenses } = this.props;
    // console.log(expenses);

    const { userEmail } = this.props;
    // console.log(userEmail);
    return (
      <div>
        <div>
          <p data-testid="email-field">{userEmail}</p>
        </div>
        <div>
          <p data-testid="total-field">
            {
              expenses.length <= 0 ? 0 : expenses
                .reduce(
                  (acc, cur) => acc
                  + parseFloat(cur.value * cur.exchangeRates[cur.currency].ask)
                    .toFixed(2), 0,
                )
            }
          </p>
        </div>
        <div>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Header);
