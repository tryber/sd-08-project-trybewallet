import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addWallet,
  deleteExpense as deleteExpenseAction,
  editExpense as editExpenseAction,
  fetchCurrencies,
} from '../actions';
import Header from '../components/Header';
import HeaderTable from '../components/HeaderTable';
import { roundUp, twoDecimal } from '../services';
import RenderForms from '../components/RenderForms';

const metodos = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const categorias = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const ADICIONAR_DESPESA = 'Adicionar despesa';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: metodos[0],
      tag: categorias[0],
      totalValue: 0,
      id: 0,
      editedId: 0,
      btnName: ADICIONAR_DESPESA,
    };
    this.handleChange = this.handleChange.bind(this);
    this.addExpenseToWallet = this.addExpenseToWallet.bind(this);
    this.resetFields = this.resetFields.bind(this);
    this.deleteExpenses = this.deleteExpenses.bind(this);
    this.totalValueUpDate = this.totalValueUpDate.bind(this);
    this.editExpenses = this.editExpenses.bind(this);
    this.editExpenseTable = this.editExpenseTable.bind(this);
  }

  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
    this.totalValueUpDate();
  }

  totalValueUpDate() {
    const { expenses } = this.props;
    this.setState({
      totalValue: expenses
        .reduce((acc, cur) => acc + (cur.value * cur.exchangeRates[cur.currency].ask), 0),
    });
    console.log('totalvalueupdate');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  resetFields() {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      btnName: ADICIONAR_DESPESA,
    });
  }

  async addExpenseToWallet() {
    const { value, description, currency, method, tag, totalValue, id } = this.state;
    const { addToWallet, fetchCurrency } = this.props;
    await fetchCurrency();
    const { currencies } = this.props;
    const expense = { id, value, description, currency, method, tag, currencies };
    addToWallet(expense);
    const total = parseFloat(value) * parseFloat(currencies[currency].ask);
    this.setState({
      totalValue: totalValue + total,
      id: id + 1,
    });
    this.resetFields();
  }

  deleteExpenses(index, value) {
    const { totalValue } = this.state;
    const { deleteExpense } = this.props;
    deleteExpense(index);
    this.setState({
      totalValue: totalValue - value,
    });
  }

  editExpenses(id) {
    const { expenses } = this.props;
    const expense = expenses.find((expens) => expens.id === id);
    this.setState({
      editedId: expense.id,
      value: expense.value,
      description: expense.description,
      currency: expense.currency,
      method: expense.method,
      tag: expense.tag,
      btnName: 'Editar Despesa',
    });
  }

  async editExpenseTable(currencies) {
    const { value,
      description, method, tag, currency, editedId } = this.state;
    const { editExpense } = this.props;
    const edittedExpense = { id: editedId,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currencies };
    await editExpense(editedId, edittedExpense);
    this.totalValueUpDate();
    this.resetFields();
  }

  walletTable() {
    const { expenses } = this.props;
    return expenses.map((expense) => (
      <tbody key={ expense.id }>
        <tr>
          <td>{expense.description}</td>
          <td>{expense.tag}</td>
          <td>{expense.method}</td>
          <td>{`${roundUp(expense.value, 2)}`}</td>
          <td>{expense.exchangeRates[expense.currency].name}</td>
          <td>{twoDecimal(expense.exchangeRates[expense.currency].ask, 2)}</td>
          <td>
            {roundUp(parseFloat(expense.exchangeRates[expense.currency].ask)
            * parseFloat(expense.value), 2)}
          </td>
          <td>Real</td>
          <td>
            <button
              type="button"
              data-testid="edit-btn"
              onClick={ () => this.editExpenses(expense.id) }
            >
              Editar
            </button>
            <button
              type="button"
              data-testid="delete-btn"
              onClick={ () => this.deleteExpenses((expense.id),
                (parseFloat(expense.exchangeRates[expense.currency].ask)
                * parseFloat(expense.value))) }
            >
              Deletar
            </button>
          </td>
        </tr>
      </tbody>));
  }

  render() {
    const { email, expenses, currenciesArray } = this.props;
    const { value,
      description, totalValue, method, tag, currency, btnName, editedId } = this.state;
    const expense = expenses.find((expens) => expens.id === editedId);
    return (
      <main>
        <Header email={ email } totalValue={ totalValue } />
        <section>
          <RenderForms
            value={ value }
            description={ description }
            onChange={ this.handleChange }
            currency={ currency }
            method={ method }
            tag={ tag }
            currencies={ currenciesArray }
            btnName={ btnName }
            onClick={ btnName === ADICIONAR_DESPESA ? this.addExpenseToWallet
              : () => this.editExpenseTable(expense.exchangeRates) }
          />
          <table>
            <HeaderTable />
            {this.walletTable()}
          </table>
        </section>
      </main>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  fetchCurrency: PropTypes.func.isRequired,
  addToWallet: PropTypes.func.isRequired,
  currencies: PropTypes.shape().isRequired,
  currenciesArray: PropTypes.shape().isRequired,
  expenses: PropTypes.shape().isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currenciesAPI,
  currenciesArray: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchCurrencies()),
  addToWallet: (object) => dispatch(addWallet(object)),
  deleteExpense: (position) => dispatch(deleteExpenseAction(position)),
  editExpense: (id, exp) => dispatch(editExpenseAction(id, exp)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
