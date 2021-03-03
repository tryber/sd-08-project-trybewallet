import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrency } from '../../../services/currencyAPI';
import { expensesWithExchangeRates, updateExpense } from '../../../actions';
import SpendFormInput from './SpendForm_Input';
import SpendFormSelect from './SpendForm_Select';

class SpendForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyData: [],
      expenses: {
        id: 0,
        value: '0',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    };

    this.inputOnChange = this.inputOnChange.bind(this);
  }

  componentDidMount() {
    getCurrency()
      .then((data) => this.setState({ currencyData: Object.entries(data) }));
  }

  componentDidUpdate(prevProps) {
    const { state: { wallet: { isEditing } } } = this.props;
    const { state: { wallet: { isEditing: isEditingPrev } } } = prevProps;
    if (!isEditingPrev && isEditing) {
      this.updateForm();
    }
  }

  updateForm() {
    const { state: { wallet: { editExpense: {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    } } } } = this.props;
    this.setState({
      expenses: {
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      },
    });
  }

  updateState() {
    this.setState((prevState) => ({
      expenses: { id: prevState.expenses.id + 1, value: 0 },
    }));
  }

  inputOnChange({ target: { name, value } }) {
    const { expenses } = this.state;
    this.setState({ expenses: { ...expenses, [name]: value } });
  }

  btnAdd() {
    const { combineExpenses } = this.props;
    const { expenses } = this.state;
    return (
      <button
        type="button"
        onClick={ async () => {
          await combineExpenses(expenses);
          this.updateState();
        } }
      >
        Adicionar despesa
      </button>
    );
  }

  btnEdit() {
    const { updateExp, state: { wallet: { expenses } } } = this.props;
    const { expenses: exp } = this.state;
    return (
      <button
        type="button"
        onClick={ () => {
          // console.log(expenses);
          // console.log(exp);
          updateExp(exp, expenses);
        } }
        style={ { background: 'yellow' } }
      >
        Editar despesa
      </button>
    );
  }

  render() {
    const { currencyData, expenses } = this.state;
    const { state: { wallet: { isEditing } } } = this.props;
    return (
      <form>
        <SpendFormInput
          inputOnChange={ this.inputOnChange }
          value={ expenses.value }
          description={ expenses.description }
        />
        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            onChange={ this.inputOnChange }
            value={ expenses.currency }
          >
            {currencyData.map((currency) => {
              if (currency[0] !== 'USDT') {
                return (
                  <option
                    key={ currency[0] }
                    data-testid={ currency[0] }
                    value={ currency[0] }
                  >
                    { currency[0] }
                  </option>
                );
              }
              return '';
            })}
          </select>
        </label>
        <SpendFormSelect
          inputOnChange={ this.inputOnChange }
          method={ expenses.method }
          tag={ expenses.tag }
        />
        { isEditing ? this.btnEdit() : this.btnAdd() }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  combineExpenses: (expensesData) => dispatch(expensesWithExchangeRates(expensesData)),
  updateExp: (expense, expenses) => dispatch(updateExpense(expense, expenses)),
});

SpendForm.propTypes = {
  combineExpenses: PropTypes.func.isRequired,
  updateExp: PropTypes.func.isRequired,
  state: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }).isRequired,
    wallet: PropTypes.shape({
      expenses: PropTypes.instanceOf(Array).isRequired,
      isEditing: PropTypes.bool.isRequired,
      editExpense: PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        method: PropTypes.string.isRequired,
        tag: PropTypes.string.isRequired,
        currency: PropTypes.string.isRequired,
        exchangeRates: PropTypes.instanceOf(Object).isRequired,
      }),
    }).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SpendForm);
