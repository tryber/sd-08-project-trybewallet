import React from 'react';
import PropTypes from 'prop-types';

import '../css/wallet.css';

import { connect } from 'react-redux';
import walletLogo from '../images/wallet-with-cash-and-coins_150x116.png';
import nameLogo from '../images/MyWallet_logo_01.png';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    console.log(email);
    return (
      <section>
        <header className="header">
          <div>
            <img src={ walletLogo } alt="wallet" className="wallet-img" />
            <img src={ nameLogo } alt="logo" className="logo-img" />
          </div>
          <div>
            <h1 className="title">Carteira</h1>
          </div>
          <div className="infos-container">
            <p data-testid="total-field">{`E-mail: ${email}`}</p>
            <p>Total</p>
            <p>Moeda</p>
          </div>
        </header>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.data.email,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = { email: PropTypes.string.isRequired };
