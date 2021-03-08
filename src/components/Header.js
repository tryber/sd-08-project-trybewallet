import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  calcExp() {
    const { expenses } = this.props;
    return expenses.reduce((acc, cur) => {
      const { ask } = cur.currencies[cur.currency];
      const calc = Number(ask * cur.value) || null;
      return acc + Number(calc);
    }, 0).toFixed(2);
  }

  render() {
    const { userEmail, expenses } = this.props;
    console.log(expenses);
    return (
      <div>
        <div>
          <p data-testid="email-field">{userEmail}</p>
        </div>
        <div>
          <p data-testid="total-field">{this.calcExp()}</p>
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
  expenses: state.currency.expenses,
});

// const mapDispatchToProps = {

// };

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
