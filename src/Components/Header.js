import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: 'BRL',
    };
  }

  render() {
    const { currency } = this.state;
    const { email, total } = this.props;
    return (
      <header>
        <div>TrybeWallet</div>
        <div data-testid="email-field">
          {`User: ${email}`}
        </div>
        <div data-testid="total-field">
          Outgoing:
          {total > 0 ? total.toFixed(2) : 0}
        </div>
        <div data-testid="header-currency-field">
          {`Currency: ${currency}`}
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;
