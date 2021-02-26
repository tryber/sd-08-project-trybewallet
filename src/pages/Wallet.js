import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email, total } = this.props;

    return (
      <div>
        <header>
          <h1 data-testid="email-field">{email}</h1>
          <h2 data-testid="total-field">{total}</h2>
          <h3 data-testid="header-currency-field">BRL</h3>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,

});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
