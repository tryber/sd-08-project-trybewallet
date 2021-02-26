import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import expense from '../../data/expense';
import './style.css';
import Select from './WalletForm/Select';
import Option from './WalletForm/Select/Option';

class WalletHeader extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <h1>TrybeWallet</h1>
        <div>
          <span data-testid="email-field">{email}</span>
          <p>
            <span data-testid="total-field">0</span>
            <Select
              data-testid="header-currency-field"
              name="currency-field"
              id="id-currency-field"
              options={ expense.cambio }
            >
              <Option
                item="BRL"
                Selected
              />
            </Select>
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ user: { email } }) => ({
  email,
});

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(WalletHeader);
