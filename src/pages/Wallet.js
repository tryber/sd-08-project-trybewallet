import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addWallet, deleteExpense, fetchCurrencies } from '../actions';
import Header from '../components/Header';
import Button from '../components/Button';
import HeaderTable from '../components/HeaderTable';
import { roundUp } from '../services';
import RenderForms from '../components/RenderForms';

const metodos = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const categorias = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

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
    };
    this.handleChange = this.handleChange.bind(this);
    this.addExpenseToWallet = this.addExpenseToWallet.bind(this);
    this.resetFields = this.resetFields.bind(this);
    this.deleteExpenses = this.deleteExpenses.bind(this);
    this.totalValueUpDate = this.totalValueUpDate.bind(this);
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
    const { deleteExpenseAction } = this.props;
    deleteExpenseAction(index);
    this.setState({
      totalValue: totalValue - value,
    });
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
          <td>{roundUp(expense.exchangeRates[expense.currency].ask, 2)}</td>
          <td>
            {roundUp(parseFloat(expense.exchangeRates[expense.currency].ask)
            * parseFloat(expense.value), 2)}
          </td>
          <td>Real</td>
          <td>
            <button
              type="button"
              data-testid="edit-btn"
              onClick={ this.edit }
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
    const { email, currencies } = this.props;
    const { value, description, totalValue, method, tag, currency } = this.state;
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
            currencies={ currencies }
          />
          <Button onClick={ this.addExpenseToWallet }>
            Adicionar despesa
          </Button>
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
  expenses: PropTypes.shape().isRequired,
  deleteExpenseAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchCurrencies()),
  addToWallet: (object) => dispatch(addWallet(object)),
  deleteExpenseAction: (position) => dispatch(deleteExpense(position)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
