import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletHeader extends React.Component {
  render() {
    const { email } = this.props;
    const currency = <span data-testid="header-currency-field">BRL</span>;
    const totalExpenses = <span data-testid="total-field">0</span>;

    return (
      <header>
        <div>myFinance</div>
        <div className="user-wrapper">
          <img src="" alt="PH" />
          <div>
            <span data-testid="email-field">{ email }</span>
            <span>
              Balanço do mês:
              {' '}
              {currency}
              {' '}
              {totalExpenses}
            </span>
          </div>
        </div>
      </header>
    );
  }
}

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapState = (state) => ({
  email: state.user.email,
});

export default connect(mapState)(WalletHeader);
