import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { userCurrenciesAction, userExpensesAction } from '../actions';

class WalletHeader extends React.Component {
  render() {
    const { email } = this.props;
    const INITIAL_VALUE = 0;
    return (
      <>
        <header data-testid="email-field">{email}</header>
        <div data-testid="header-currency-field">BRL</div>
        <div data-testid="total-field">
          {INITIAL_VALUE}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  email: user.email,
  password: user.password,
});

export default connect(mapStateToProps)(WalletHeader);

WalletHeader.propTypes = {
  email: PropTypes.func.isRequired,
};
