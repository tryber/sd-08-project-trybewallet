import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { userInfos: { email, password } } = this.props;
    console.log(email, password);
    return (
      <div>
        <header>
          TrybeWallet
          <span data-testid="email-field">{email}</span>
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
      </div>
    );
  }
}

Wallet.propTypes = {
  userInfos: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  userInfos: state.user,
});

export default connect(mapStateToProps, null)(Wallet);
