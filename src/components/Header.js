import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import '../App.css';
import logo from '../logo.png';

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
      <header className="App-header">
        <img src={ logo } alt="logoPokewallet" width="200px" />
        <span>Email:</span>
        <span data-testid="email-field">
          {' '}
          { email }
        </span>
        <span>Despesas Total:</span>
        <span data-testid="total-field">
          { `R$ ${this.renderValue()}` }
        </span>
        <span data-testid="header-currency-field">BRL</span>
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
