import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderWallet from '../components/HeaderWallet';
import TableWallet from '../components/TableWallet';
import { fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { propFetchCurrencies } = this.props;
    propFetchCurrencies();
  }

  render() {
    return (
      <div>
        <HeaderWallet />
        <TableWallet />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    propFetchCurrencies: () => dispatch(fetchCurrencies()),
  };
}

export default connect(null, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  propFetchCurrencies: PropTypes.func.isRequired,
};
