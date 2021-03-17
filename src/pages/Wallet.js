import React from 'react';
import { connect } from 'react-redux';
import EditForm from '../components/EditForm';
import Form from '../components/Form';
import Header from '../components/Header';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    const { isEdit } = this.props;
    return (
      <div>
        <Header />
        { isEdit ? <EditForm /> : <Form /> }
        <Table />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isEdit: state.wallet.edit,
});

export default connect(mapStateToProps)(Wallet);
