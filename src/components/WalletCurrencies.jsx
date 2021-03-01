import React from 'react';
import { connect } from 'react-redux';
import { requestCurrencies } from '../actions';

class WalletCurrencies extends React.Component {
  render() {
    const { currency } = this.props;
    return (
      <form>
        <select data-testid="currency-input">
          Escolha a moeda de sua despesa
          <option value="Teste">{currency}</option>
        </select>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currencies: (value) => dispatch(requestCurrencies(value)),
});

export default connect(null, mapDispatchToProps)(WalletCurrencies);
