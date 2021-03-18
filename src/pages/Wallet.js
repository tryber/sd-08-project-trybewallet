import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpensesForm from '../components/ExpensesForm';
import Header from '../components/Header';
import { fetchCurrencies as actualCurrencies } from '../actions';
import ExpensesTable from '../components/ExpensesTable';
import EditExpensesForm from '../components/EditExpensesForm';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    const { editTarget } = this.props;
    return (
      <div>
        <Header />
        {editTarget ? <EditExpensesForm /> : <ExpensesForm />}
        <ExpensesTable />
      </div>
    );
  }
}

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  editTarget: PropTypes.bool,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(actualCurrencies()),
});

const mapStateToProps = (state) => ({
  editTarget: state.wallet.editTarget,
});
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.defaultProps = {
  editTarget: false,
};
