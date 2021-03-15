import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpensesForm from '../components/ExpensesForm';
import Header from '../components/Header';
import { fetchCurrencies as actualCurrencies } from '../actions';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    return (
      <div>
        <Header />
        <ExpensesForm />
        <ExpensesTable />
      </div>
    );
  }
}

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(actualCurrencies()),
});
export default connect(null, mapDispatchToProps)(Wallet);
