import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/header';
import ExpenseForm from '../components/expenseForm';
import Table from '../components/table';
import Edit from '../components/edit';

class Wallet extends Component {
  render() {
    const { edit } = this.props;
    return (
      <>
        <Header />
        {edit ? <Edit /> : <ExpenseForm />}
        <Table />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  edit: state.wallet.edit,
});

Wallet.propTypes = {
  edit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
