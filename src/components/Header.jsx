import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, totalValue } = this.props;
    return (
      <header>
        <span>Header</span>
        <p data-testid="email-field">{ email }</p>
        <span data-testid="total-field">{ totalValue }</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalValue: state.wallet.totalValue,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalValue: PropTypes.number,
};

Header.defaultProps = {
  totalValue: 0,
};

export default connect(mapStateToProps, null)(Header);
