import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div className="wallet-main">
        {email !== ''
          && (
            <>
              <header>
                <h2>Wallet</h2>
                <p data-testid="email-field">{email}</p>
              </header>

              <section>
                <h3>Lista de Gastos</h3>
                <p data-testid="total-field">0</p>
                <h3 data-testid="header-currency-field">BRL</h3>
              </section>
            </>
          )}
      </div>
    );
  }
}

const mapStateToProps = ({ user: { email } }) => ({
  email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
