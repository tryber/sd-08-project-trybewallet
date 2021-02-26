import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from './WalletForm/Select';
import Option from './WalletForm/Select/Option';
import expense from '../../data/expense';
import './style.css';

class WalletHeader extends React.Component {
  render() {
    const { email, total, cambio } = this.props;
    const totalMoney = new Intl.NumberFormat(cambio, {
      style: 'currency', currency: cambio,
    }).format(total);
    return (
      <header>
        <h1>TrybeWallet</h1>
        <div>
          <span data-testid="email-field">{email}</span>
          <span data-testid="total-field">{`Despesa Total: ${totalMoney}`}</span>
          <Select
            title="moeda"
            data-testid="header-currency-field"
            name="currency-field"
            id="id-currency-field"
            options={ expense.cambio }
          >
            <Option
              item={ { code: 'BRL' } }
            />
          </Select>

        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { coins: { cambio, total } } }) => ({
  email,
  cambio,
  total,
});

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
  cambio: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,

};

export default connect(mapStateToProps)(WalletHeader);
