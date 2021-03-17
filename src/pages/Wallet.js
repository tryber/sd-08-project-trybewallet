import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditForm from '../components/EditForm';
import ExpenseForm from '../components/ExpensesForm';
import Header from '../components/Header';
import { fetchCurrencies as fetchCurrenciesAction } from '../actions';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  constructor() {
    super();
    this.enterEditMode = this.enterEditMode.bind(this);
    this.editCompleted = this.editCompleted.bind(this);
    this.state = {
      isEditing: false,
      editExpense: {},
    };
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  enterEditMode(expense) {
    this.setState({
      isEditing: true,
      editExpense: expense,
    });
  }

  editCompleted() {
    this.setState({
      isEditing: false,
      editExpense: {},
    });
  }

  render() {
    const { isEditing, editExpense } = this.state;
    return (
      <section>
        <Header />
        {!isEditing
          ? <ExpenseForm />
          : <EditForm expense={ editExpense } editCompleted={ this.editCompleted } />}
        <ExpensesTable edit={ this.enterEditMode } />
      </section>
    );
  }
}

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: (currencies) => dispatch(fetchCurrenciesAction(currencies)),
});

export default connect(null, mapDispatchToProps)(Wallet);
