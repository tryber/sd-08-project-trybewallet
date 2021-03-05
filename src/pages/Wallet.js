import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { walletThunk } from '../actions';
import FormHeader from '../components/FormHeader';
import Form from '../components/Form';
import Table from '../components/Table';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    return (
      <div>
        <FormHeader />
        <Form />
        <Table />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: (value) => dispatch(walletThunk(value)),

});

Wallet.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
