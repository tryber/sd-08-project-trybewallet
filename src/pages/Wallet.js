import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../actions/components/Header';
import Form from '../actions/components/Form';
import ExpenseTable from '../actions/components/ExpenseTable';
import EditingForm from '../actions/components/EditingForm';

class Wallet extends React.Component {
  render() {
    const { editing } = this.props;
    return (
      <>
        <Header />
        { editing ? <EditingForm /> : <Form /> }
        <ExpenseTable />
      </>
    );
  }
}

const mapStateToProps = ({ wallet: { editing } }) => ({
  editing,
});

Wallet.propTypes = {
  editing: PropTypes.bool,
};

Wallet.defaultProps = {
  editing: false,
};

export default connect(mapStateToProps, null)(Wallet);
