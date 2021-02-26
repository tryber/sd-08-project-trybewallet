import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/header.css';
import { connect } from 'react-redux';
import logo from '../assets/images/wallet.svg';

class Header extends Component {
  render() {
    const totalExpenses = 0;
    const { email } = this.props;
    return (
      <header>
        <img src={ logo } alt="Logo Wallet" />
        <span data-testid="email-field">{`Email: ${email}`}</span>
        <div>
          <span data-testid="total-field">{`Despesas: ${totalExpenses} `}</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}
Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
});
export default connect(mapStateToProps, null)(Header);
