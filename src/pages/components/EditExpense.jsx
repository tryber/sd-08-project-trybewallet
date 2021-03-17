import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import saveEditAction from '../../actions/saveEditAction';

class EditExpense extends React.Component {
  constructor(props) {
    super(props);
    const { expenseToEdit, expenses } = this.props;
    const expense = expenses.find((item) => item.id === expenseToEdit);
    this.state = {
      ...expense,
    };

    this.payments = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    this.tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    this.editForm = this.editForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.id]: target.value });
  }

  editForm() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <>
        <input
          type="text"
          id="value"
          data-testid="value-input"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          type="text"
          id="description"
          data-testid="description-input"
          value={ description }
          onChange={ this.handleChange }
        />
        <select
          id="currency"
          data-testid="currency-input"
          value={ currency }
          onChange={ this.handleChange }
        >
          {currencies.map((item) => <option key={ item }>{item}</option>)}
        </select>
        <select
          id="method"
          data-testid="method-input"
          value={ method }
          onChange={ this.handleChange }
        >
          {this.payments.map((item) => <option key={ item }>{item}</option>)}
        </select>
        <select
          id="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ this.handleChange }
        >
          {this.tags.map((item) => <option key={ item }>{item}</option>)}
        </select>
      </>
    );
  }

  render() {
    const { saveEdit } = this.props;
    return (
      <>
        {this.editForm()}
        <button
          type="button"
          onClick={ () => saveEdit(this.state) }
        >
          Editar despesa
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  expenseToEdit: state.wallet.expenseToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  saveEdit: (expense) => dispatch(saveEditAction(expense)),
});

EditExpense.propTypes = {
  expenseToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveEdit: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);
