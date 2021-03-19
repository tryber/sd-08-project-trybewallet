import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../componets/Header';
import Gastos from '../componets/Gastos';
import Table from '../componets/Table';
import Edit from '../componets/Edit';

class Wallet extends React.Component {
  render() {
    const { edit } = this.props;
    return (
      <div>
        <Header />
        {edit ? <Edit /> : <Gastos />}
        <Table />
        TrybeWallet
      </div>);
  }
}

const mapStateToProps = (state) => ({
  edit: state.wallet.edit,
});

Wallet.propTypes = {
  edit: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
