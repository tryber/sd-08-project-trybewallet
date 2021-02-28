import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const WalletHeader = ({ email }) => {
  const inital = 0;
  return (
    <header className="wallet-header">
      <img src="../../public/images/trybe-logo.png" alt="Trybe Logo" />
      <section className="wallet-header-info">
        <p data-testid="email-field">{`Email: ${email}`}</p>
        <p data-testid="total-field">{`Despesa total: ${inital}`}</p>
        <p data-testid="header-currency-field">BRL</p>
      </section>
    </header>
  );
};

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapState = (state) => ({
  email: state.user.email,
});

export default connect(mapState)(WalletHeader);
