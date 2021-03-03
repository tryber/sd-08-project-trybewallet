import React from 'react';
import { connect } from 'react-redux';
import { func, arrayOf, objectOf, bool } from 'prop-types';
import { fetchCurrencies, setExpenseEdit } from '../actions';
import Header from '../components/Header';
import RegisterExpense from '../components/RegisterExpenses';
import TableExpenditure from '../components/TableExpenditure';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      idExpenses: 0,
      valueExpenditure: '0',
      descriptionExpenditure: '',
      currentCoin: 'USD',
      paymentMethod: 'Dinheiro',
      expenditureCategories: 'Alimentação',
      setIdEdit: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.getExpenses = this.getExpenses.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.onClickSetEdit = this.onClickSetEdit.bind(this);
  }

  componentDidMount() {
    const { currencies } = this.props;
    currencies();
  }

  onClickSetEdit({ target: { dataset: { idexpenditure } } }) {
    const { expenses } = this.props;
    const result = expenses.find((el) => el.id === Number(idexpenditure));
    this.setState({
      valueExpenditure: result.value,
      currentCoin: result.currency,
      paymentMethod: result.method,
      descriptionExpenditure: result.description,
      expenditureCategories: result.tag,
      setIdEdit: result.id,
    });
  }

  getExpenses() {
    const { editSeting } = this.props;
    if (!editSeting) {
      this.setState((state) => ({ idExpenses: state.idExpenses + 1 }));
    }
    const {
      idExpenses,
      valueExpenditure,
      descriptionExpenditure,
      currentCoin,
      paymentMethod,
      expenditureCategories,
      setIdEdit,
    } = this.state;
    const idCur = editSeting ? setIdEdit : idExpenses;
    return {
      id: idCur,
      value: valueExpenditure,
      currency: currentCoin,
      method: paymentMethod,
      tag: expenditureCategories,
      description: descriptionExpenditure,
    };
  }

  resetForm() {
    this.setState({
      valueExpenditure: '0',
      descriptionExpenditure: '',
      currentCoin: 'USD',
      paymentMethod: 'Dinheiro',
      expenditureCategories: 'Alimentação',
    });
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value });
  }

  render() {
    const result = this.state;
    return (
      <>
        <Header />
        <RegisterExpense
          { ...result }
          handleChange={ this.handleChange }
          getExpenses={ this.getExpenses }
          resetForm={ this.resetForm }
        />
        <TableExpenditure onClickSetEdit={ this.onClickSetEdit } />
      </>
    );
  }
}

Wallet.propTypes = {
  currencies: func.isRequired,
  setEdit: func.isRequired,
  expenses: arrayOf(objectOf).isRequired,
  editSeting: bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(fetchCurrencies()),
  setEdit: (expenses, id) => dispatch(setExpenseEdit(expenses, id)),
});

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
  editSeting: wallet.editSet,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
