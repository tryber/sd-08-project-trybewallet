import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, fetchCurrenciesNewValues } from '../actions';
import SelectForm from './SelectForm';
import ExpenseTable from './ExpenseTable';

class ExpensesForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.clearInputs = this.clearInputs.bind(this);
    this.saveExpense = this.saveExpense.bind(this);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { fetchCurrenciesAction } = this.props;
    fetchCurrenciesAction();
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  clearInputs() {
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  saveExpense() {
    const { fetchCurrenciesActionNewValues } = this.props;
    fetchCurrenciesActionNewValues(this.state);
    this.clearInputs();
  }

  render() {
    const { currenciesTags } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        <label htmlFor="value-input">
          <span>Valor da despesa:</span>
          <input
            name="value"
            id="value-input"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description-input">
          <span>Descrição da despesa:</span>
          <input
            name="description"
            id="description-input"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <select
          name="currency"
          data-testid="currency-input"
          value={ currency }
          onChange={ this.handleChange }
        >
          {currenciesTags.map((cCurrency) => (
            <option key={ cCurrency } data-testid={ cCurrency }>{cCurrency}</option>
          ))}
        </select>

        <SelectForm method={ method } tag={ tag } handleChange={ this.handleChange } />

        <button
          type="button"
          onClick={ this.saveExpense }
        >
          Adicionar despesa
        </button>
        <ExpenseTable />
      </form>
    );
  }
}

ExpensesForm.propTypes = {
  fetchCurrenciesAction: PropTypes.func.isRequired,
  fetchCurrenciesActionNewValues: PropTypes.func.isRequired,
  currenciesTags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currenciesTags: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesAction: () => dispatch(fetchCurrencies()),
  fetchCurrenciesActionNewValues: (expenses) => dispatch(
    fetchCurrenciesNewValues(expenses),
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
