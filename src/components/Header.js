import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, expenses = 0 } = this.props;
    return (
      <header>
        TrybeWallet
        <h4 data-testid="email-field">{ email }</h4>
        <h4 data-testid="total-field">{ expenses }</h4>
        <h4 data-testid="header-currency-field">BRL</h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.string.isRequired,
};
