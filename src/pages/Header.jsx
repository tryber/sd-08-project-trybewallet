import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/header.css';

class Header extends React.Component {
  render() {
    const { email, total } = this.props;
    return (
      <header>
        <h1>Trybe Wallet</h1>
        <section>
          <span data-testid="email-field">{email}</span>
          <span data-testid="total-field">
            0
            {total}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </section>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.totalExpense,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};
