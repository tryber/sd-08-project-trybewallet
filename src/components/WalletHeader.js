import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletHeader extends React.Component {
  render() {
    const { email } = this.props;
    const total = 0;
    return (
      <header>
        <span data-testid="email-field">
          Email:
          { ' ' }
          { email }
          { ' ' }
        </span>
        <span data-testid="total-field">
          Despesa total: R$
          { ' ' }
          { total }
          { ' ' }
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(WalletHeader);
