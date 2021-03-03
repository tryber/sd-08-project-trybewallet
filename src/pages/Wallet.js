import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies as fetchCurrAction } from '../actions';
import HeaderWallet from '../components/HeaderWallet';
import Forms from '../components/Forms';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    return (
      <div>
        <HeaderWallet />
        <Forms />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: (fetchCurr) => dispatch(fetchCurrAction(fetchCurr)),
});

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
