import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import expenses from '../types';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <dl>
          <dt>Email</dt>
          <dd data-testid="email-field">{ email }</dd>
          <dt>Total</dt>
          <dd data-testid="total-field">R$0</dd>
          <dt>Câmbio</dt>
          <dd data-testid="header-currency-field">BRL</dd>
        </dl>
      </header>
    );
  }
}
Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(expenseType).isRequired,
};

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);
