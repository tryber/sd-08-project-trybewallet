import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpensesForm from '../components/ExpensesForm';
import EditExpensesForm from '../components/EditExpensesForm';
import Header from '../components/Header';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    const { isEditing } = this.props;

    return (
      <div>
        <Header />
        {isEditing ? <EditExpensesForm /> : <ExpensesForm /> }
        <Table />
      </div>);
  }
}

const mapStateToProps = (state) => ({
  isEditing: state.wallet.isEditing,
});

Wallet.propTypes = {
  isEditing: PropTypes.bool,
};

Wallet.defaultProps = {
  isEditing: false,
};
export default connect(mapStateToProps)(Wallet);
