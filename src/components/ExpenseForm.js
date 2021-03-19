import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCurrenciesValues as fetchCurrencies,
  saveExpenseUser as addExpense,
  editModeUser as editModeAction,
  updateExpenseUser as updateExpense,
} from '../actions';

import getCurrenciesValues from '../services/currenciesValuesApi';

const INITIAL_STATE = {
  value: '0',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  id: 0,
  tag: 'Alimentação',
};

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    // O estado inicial é passado pelo pai Wallet, ele passa um estado para o caso de edição ou de adicionar
    const { editMode, expenses } = this.props;
    let data = {};
    if (editMode[1]) data = expenses.find((expense) => expense.id === editMode[0]);

    this.state = {
      ...INITIAL_STATE,
      ...data,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { fetchCurrenciesValuesAction } = this.props;
    // Função que busca a cotação das moedas
    fetchCurrenciesValuesAction();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleClick() { // esse ten que variar
    const { id } = this.state;
    const { saveExpenseUserAction, editModeUserAction,
      editMode, updateExpenseUserAction } = this.props;
    const exchangeRates = await getCurrenciesValues(); // atualiza cotação
    const expenses = { // Armazena estado atual mais os valores da cotação do momento
      ...this.state,
      exchangeRates,
    };
    if (editMode[1] === 1) { // Se em modo edição
      await editModeUserAction(0, 0); // Muda de edição para modo de não edição
      await updateExpenseUserAction(expenses); // Envia a Nova despesa Reducer
    } else {
      await saveExpenseUserAction(expenses); // Em modo de adição, adiciona o novo valor na tabela
      this.setState({
        ...resetInitialState, // Pega o obj fora da classe resetar para o estado inicial
        id: id + 1, // Incrementa o valor do índice
      });
    }
  }

  // textButton() { // Atenção aqui!...!!!!!!!!!!!!!!!!!1
  //   const { editMode } = this.props;
  //   if (editMode[1] === 1) {r // A depende do modo de exibição, informa os valores do botão de "salvar"
  //     const textButton = 'Editar despesa';
  //     const dataTestid = 'edit-btn';
  //     return [textButton, dataTestid];
  //   }
  //   const textButton = 'Adicionar despesa';
  //   const dataTestid = 'add-btn';
  //   return [textButton, dataTestid];
  // }

  textButton() { // Atenção aqui!...!!!!!!!!!!!!!!!!!1
    const { editMode } = this.props;
    const editor = editMode[1];
    const textButton = editor ? 'Editar despesa' : 'Adicionar despesa';
    const dataTestid = editor ? 'edit-btn' : 'add-btn';
    return [textButton, dataTestid];
  }

  addOurExpenseButton(textButton, dataTestid) {
    return (
      <button
        type="button"
        onClick={ this.handleClick }
        data-testid={ dataTestid }
      >
        {textButton}
      </button>
    );
  }

  renderInput(name, label, type, value) {
    return (
      <label htmlFor={ `${name}-input` }>
        {`${label}: `}
        <input
          id={ `${name}-input` }
          type={ type }
          name={ `${name}` }
          data-testid={ `${name}-input` }
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderSelectCurrencies(currenciesState, value) {
    return (
      <select
        data-testid="currency-input"
        onChange={ this.handleChange }
        name="currency"
        value={ value }
      >
        { currenciesState.map((element, index) => {
          if (element.codein !== 'BRLT') {
            return (
              <option
                key={ index }
                value={ element.code }
                data-testid={ `${element.code}` }
              >
                {element.code}
              </option>);
          }
          return '';
        })}
      </select>
    );
  }

  renderSelect(name, label, value, options) {
    return (
      <label htmlFor={ `${name}-input` }>
        {`${label}: `}
        <select
          id={ `${name}-input` }
          name={ name }
          data-testid={ `${name}-input` }
          onChange={ this.handleChange }
          value={ value }
        >
          {options.map((option, index) => (
            <option key={ index }>{option}</option>
          ))}
        </select>
      </label>
    );
  }

  render() {
    const paymentOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { value, description, currency, method, tag } = this.state;
    const { stateWallet } = this.props;
    const [textButton, dataTestid] = this.textButton();

    return (
      <div>
        {this.renderInput('value', 'Valor', 'number', value)}
        {this.renderInput('description', 'Descrição', 'text', description)}
        {this.renderSelectCurrencies(stateWallet.currencies, currency)}
        {this.renderSelect('method', 'Meio de Pagamento', method, paymentOptions)}
        {this.renderSelect('tag', 'Tag', tag, tags)}
        {this.addOurExpenseButton(textButton, dataTestid)}
      </div>
    );
  }
}

ExpenseForm.propTypes = {
  fetchCurrenciesValuesAction: PropTypes.func.isRequired,
  editModeUserAction: PropTypes.func.isRequired,
  saveExpenseUserAction: PropTypes.func.isRequired,
  updateExpenseUserAction: PropTypes.func.isRequired,
  editMode: PropTypes.arrayOf(PropTypes.number).isRequired,
  stateWallet: PropTypes.arrayOf(PropTypes.object).isRequired,
  INITIAL_STATE: PropTypes.shape({
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    tag: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  stateWallet: state.wallet,
  expenses: state.wallet.expenses,
  editMode: state.wallet.editExpense,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesValuesAction: () => dispatch(fetchCurrencies()),
  saveExpenseUserAction: (expense) => dispatch(addExpense(expense)),
  editModeUserAction: (...args) => dispatch(editModeAction(...args)),
  updateExpenseUserAction: (expense) => dispatch(updateExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
