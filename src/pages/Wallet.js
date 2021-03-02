import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencyFilter as fetchCurrencyFilterActions,
  addDespesa,
  deleteDespesa,
  editDespesa,
  btKey,
} from '../actions';
import Header from '../components/Header';
import FormWallet from '../components/FormWallet';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: {
        value: 0,
        descricao: '',
        moeda: 'USD',
        pagamentos: 'Dinheiro',
        categorias: 'Alimentação',
      },
      coinsFilter: [],
      total: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencyFilter } = this.props;
    fetchCurrencyFilter();
  }

  deleteState() {
    this.setState((prevState) => ({
      ...prevState,
      expense: {
        value: 0,
        descricao: '',
        moeda: 'USD',
        pagamentos: 'Dinheiro',
        categorias: 'Alimentação',
      },
    }));
  }

  handleChange({ target }) {
    const { expense } = this.state;
    const { value, name } = target;
    this.setState({
      expense: { ...expense, [name]: value },
    });
  }

  calcTotal() {
    const { expenses } = this.props;
    const total = expenses
      .reduce((acc, curr) => (
        acc + (curr.value * curr.exchangeRates[curr.currency].ask)
      ), 0);
    this.setState({
      total,
    });
  }

  handleClick() {
    const { expense } = this.state;
    const {
      addDespesaToProps,
      btBool,
      expenses,
      // btKey,
      editDespesasToProps,
    } = this.props;
    if (!btBool) {
      addDespesaToProps(expense)
        .then(() => this.calcTotal())
        .then(() => this.deleteState());
    } else {
      const idDespesa = expense.id;
      const mapDespesa = expenses.map((element) => {
        if (element.id === idDespesa) {
          return expense;
        }
        return element;
      });
      editDespesasToProps(mapDespesa);
    }
    btKey(false);
    this.deleteState();
  }

  render() {
    const { user, expenses, deleteDespesaToProps } = this.props;
    const { total } = this.state;
    console.log(this.state);
    return (
      <div>
        <p>
          <Header
            email={ user }
            total={ total }
          />
        </p>
        <p>
          <FormWallet
            teste={ this.state }
            handleChange={ this.handleChange }
            handleClick={ this.handleClick }
            coinsFilter={ this.coinsFilter }
          />
        </p>
        <p>
          <Table
            despesas={ expenses }
            deleteDespesaToProps={ deleteDespesaToProps }
          />
        </p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
  btKey: state.wallet.btBool,
});

const mapDispatchToProps = (dispatch) => ({
  addDespesaToProps: (expense) => dispatch(addDespesa(expense)),
  deleteDespesaToProps: (id) => dispatch(deleteDespesa(id)),
  editDespesaToProps: (expenses) => dispatch(editDespesa(expenses)),
  btBool: (change) => dispatch(btKey(change)),
  fetchCurrencyFilter: () => dispatch(fetchCurrencyFilterActions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  addDespesaToProps: PropTypes.func.isRequired,
  deleteDespesaToProps: PropTypes.func.isRequired,
  editDespesasToProps: PropTypes.func.isRequired,
  btBool: PropTypes.bool.isRequired,
  fetchCurrencyFilter: PropTypes.func.isRequired,
  // btKey: PropTypes.func.isRequired,
};
