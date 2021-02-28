import React, { Component } from 'react';
import './ExpensesForm.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExpense } from '../actions';

class ExpensesForm extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderCoinList = this.renderCoinsList.bind(this);
    this.renderSelect = this.renderExpenseCoinsSelect.bind(this);
    this.renderPaymentSelect = this.renderPaymentSelect.bind(this);
    this.renderExpenseCategorySelect = this.renderExpenseCategorySelect.bind(this);
    this.renderValueInput = this.renderValueInput.bind(this);
    this.renderDescriptionInput = this.renderDescriptionInput.bind(this);

    this.state = {
      idCount: 0,
      coins: [],
      currentExpense: {},
    };
  }

  componentDidMount() {
    this.renderCoinsList();
  }

  handleChange(e) {
    const newProperty = {
      [e.target.name]: e.target.value,
    };
    this.setState((state) => ({
      currentExpense: {
        ...state.currentExpense,
        ...newProperty,
      },
    }));
  }

  handleClick() {
    this.setState((state) => ({
      idCount: state.idCount + 1,
      currentExpense: {
        ...state.currentExpense,
        id: state.idCount,
      },
    }), () => {
      const { addExpense } = this.props;
      const { currentExpense } = this.state;
      return addExpense(currentExpense);
    });
  }

  async renderCoinsList() {
    const coinsInfo = await fetch('https://economia.awesomeapi.com.br/json/all');
    const coinsJson = await coinsInfo.json();
    const coinsList = Object.values(coinsJson);
    const coinsCodeList = coinsList
      .filter((coin) => coin.codein !== 'BRLT')
      .map((coin) => coin.code);
    this.setState({ coins: coinsCodeList });
  }

  renderValueInput() {
    const { currentExpense: { value } } = this.state;
    return (
      <>
        <span>Valor</span>
        <input
          onChange={ this.handleChange }
          value={ value }
          name="value"
          type="number"
          step="0.01"
          min="0"
          data-testid="value-input"
        />
      </>
    );
  }

  renderDescriptionInput() {
    const { currentExpense: { description } } = this.state;
    return (
      <>
        <span>Descrição</span>
        <input
          onChange={ this.handleChange }
          value={ description }
          name="description"
          type="text"
          data-testid="description-input"
        />
      </>
    );
  }

  renderExpenseCoinsSelect() {
    const { coins, currentExpense: { currency } } = this.state;
    return (
      <>
        <span>Moeda</span>
        <select
          onChange={ this.handleChange }
          value={ currency }
          name="currency"
          data-testid="currency-input"
          placeholder="moeda"
          required
        >
          <option disabled selected value>Selecione</option>
          {coins === []
            ? <option>carregando</option>
            : coins.map((coin) => (
              <option
                data-testid={ `${coin}` }
                key={ coin }
              >
                { coin}
              </option>))}
        </select>
      </>
    );
  }

  renderPaymentSelect() {
    const { currentExpense: { method } } = this.state;
    return (
      <>
        <span>Método de pagamento</span>
        <select
          onChange={ this.handleChange }
          value={ method }
          name="method"
          data-testid="method-input"
        >
          <option disabled selected value>Selecione</option>
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </>
    );
  }

  renderExpenseCategorySelect() {
    const { currentExpense: { tag } } = this.state;
    return (
      <>
        <span>Tipo</span>
        <select
          onChange={ this.handleChange }
          value={ tag }
          name="tag"
          data-testid="tag-input"
        >
          <option disabled selected value>Selecione</option>
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </>
    );
  }

  render() {
    return (
      <div>
        <form className="expense-form">
          {this.renderValueInput()}
          {this.renderDescriptionInput()}
          {this.renderExpenseCoinsSelect()}
          {this.renderPaymentSelect()}
          {this.renderExpenseCategorySelect()}
          <button
            onClick={ this.handleClick }
            type="button"
          >
            Adicionar Despesa
          </button>
        </form>
      </div>
    );
  }
}

ExpensesForm.propTypes = {
  addExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addExpense: (currentExpense) => dispatch(fetchExpense(currentExpense)),
});

export default connect(null, mapDispatchToProps)(ExpensesForm);
