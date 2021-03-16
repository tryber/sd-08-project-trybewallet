import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { user, wallet } = this.props;
    const { expenses } = wallet;
    const valueNumber = expenses.map((e) => Number(e.value)
    * e.exchangeRates[e.currency].ask);
    const contador = valueNumber.reduce((acc, curr) => acc + curr, 0);

    return (
      <div>
        <p data-testid="email-field">{user.email}</p>
        <p data-testid="total-field">{contador.toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  wallet: PropTypes.shape({
    expenses: PropTypes.shape({
      value: PropTypes.string,
      map: PropTypes.func,
    }).isRequired,

  }),
};

Header.defaultProps = {
  wallet: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps)(Header);
