import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Creators as Actions } from '../actions';
import Header from '../components/Header';
import Table from '../components/Table';
import EditForm from '../components/EditForm';
import AddForm from '../components/AddForm';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    const { isEditing } = this.props;
    return (
      <>
        <Header />
        {isEditing ? <EditForm /> : <AddForm />}
        <Table />
      </>
    );
  }
}

Wallet.defaultProps = {
  isEditing: false,
};

const mapStateToProps = ({ wallet }) => ({
  isEditing: wallet.isEditing,
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch);

Wallet.propTypes = {
  isEditing: PropTypes.bool,
  fetchCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
