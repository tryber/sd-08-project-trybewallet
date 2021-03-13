import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    const VALUE_ONE = 0;
    return (
      <header>
        <h1>Wallet</h1>
        <h3>Email:</h3>
        <span data-testid="email-field">
          {' '}
          { email }
        </span>
        <div>
          <h3>Despesas Total:</h3>
          <span data-testid="total-field">{ VALUE_ONE }</span>
          <h3>R$:</h3>
          <h3 data-testid="header-currency-field">BRL</h3>
        </div>

      </header>
    );
  }
}
Header.propTypes = {
  email: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
