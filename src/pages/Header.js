import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
    this.refreshValue = this.refreshValue.bind(this);
  }

  refreshValue() {
    const { expenses } = this.props;
    const refreshTotaly = expenses
      .reduce((acc, cur) => acc + cur.value * cur.exchangeRates[cur.currency].ask, 0);
    return refreshTotaly;
  }

  render() {
    const { email } = this.props;
    return (

      <header>
        <td>
          <tr>
            <h5 data-testid="email-field">
              {email}
            </h5>

          </tr>
          <tr>

            <h5 data-testid="total-field">

              {this.refreshValue()}
            </h5>
          </tr>
          <tr>

            <h5 data-testid="header-currency-field">BRL</h5>
          </tr>
        </td>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({

  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.func.isRequired };
