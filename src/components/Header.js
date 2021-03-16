import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();
    this.renderValue = this.renderValue.bind(this);
  }

  // feito com ajuda do rodolfo
  renderValue() {
    const { expHeader } = this.props;
    return expHeader.length <= 0 ? 0 : expHeader
      .reduce(
        (acc, cur) => acc
        + cur.value * (+cur.exchangeRates[cur.currency].ask), 0,
      ).toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <h1>Wallet</h1>
        <p>Email:</p>
        <span data-testid="email-field">
          {' '}
          { email }
        </span>
        <div>
          <p>Despesas Total:</p>
          <span data-testid="total-field">
            { `R$ ${this.renderValue()}` }
          </span>
          <h3 data-testid="header-currency-field">BRL</h3>
        </div>

      </header>
    );
  }
}
Header.propTypes = {
  email: PropTypes.func.isRequired,
  expHeader: PropTypes.shape({
    length: PropTypes.func.isRequired,
    reduce: PropTypes.func.isRequired,
  }).isRequired,
};
const mapStateToProps = (state) => ({
  email: state.user.email,
  expHeader: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
