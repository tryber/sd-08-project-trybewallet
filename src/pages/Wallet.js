import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Header from '../components/Header';
import Table from '../components/Table';
import Edit from '../components/Edit';

class Wallet extends React.Component {
  render() {
    const { editing } = this.props;
    return (
      <div>
        <Header />
        { editing ? <Edit /> : <Form /> }
        <Table />
      </div>);
  }
}

const mapStateToProps = (state) => ({
  editing: state.wallet.editing,
});

Wallet.propTypes = {
  editing: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Wallet);
