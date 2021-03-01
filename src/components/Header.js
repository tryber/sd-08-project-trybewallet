import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Header.css';

class Header extends React.Component {
  render() {
    const { readEmail, amount = 0 } = this.props;

    return (
      <div className="div-header">
        <p data-testid="email-field">{ readEmail }</p>
        <span data-testid="total-field">{ amount.toFixed(2) }</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  readEmail: state.user.email,
  amount: state.wallet.total,
});

export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  readEmail: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};
