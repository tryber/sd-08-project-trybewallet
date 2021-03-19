import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditForm from '../components/EditForm';
import Form from '../components/Form';
import Header from '../components/Header';
import TableExpenses from '../components/TableExpenses';

class Wallet extends React.Component {
  render() {
    const { isEdit } = this.props;
    // console.log(isEdit);
    return (
      <>
        <Header />
        { isEdit ? <EditForm /> : <Form /> }
        <TableExpenses />
      </>
    );
  }
}

Wallet.defaultProps = {
  isEdit: null,
};

Wallet.propTypes = {
  isEdit: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isEdit: state.wallet.edit,
});

// const mapDispatchToProps = {

// }

export default connect(mapStateToProps)(Wallet);
