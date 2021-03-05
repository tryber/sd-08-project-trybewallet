import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, AddAnExpenseAction } from '../actions';

class AddExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      expense: {
        id: 0,
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {},
      },
      currentId: 0,
    };

    this.add = this.add.bind(this);
    this.handleExpense = this.handleExpense.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    const { expense } = this.state;
    getCurrencies().then(({ currencies }) => {
      const arr = Object.entries(currencies)
        .map((d) => d[1])
        .filter((moeda) => moeda.codein !== 'BRLT');
      // console.log(arr);
      this.setState({
        currencies: arr,
        expense: {
          ...expense,
          exchangeRates: currencies,
        },
      });
    });
  }

  handleExpense(e) {
    const { expense } = this.state;
    this.setState({
      expense: {
        ...expense,
        [e.target.name]: e.target.value,
      },
    });
    // console.log(`Alterado ${e.target.name} para ${e.target.value}`);
  }

  add(e) {
    e.target.parentNode.reset();

    const { getCurrencies, addExpense } = this.props;
    const { expense, currentId } = this.state;
    const PROX_ID = currentId + 1;
    getCurrencies().then(({ currencies }) => {
      delete currencies.USDT;
      // console.log(currencies);
      this.setState({
        expense: {
          ...expense,
          exchangeRates: currencies,
          id: PROX_ID,
        },
        currentId: PROX_ID,
      });
    }).then(() => addExpense(expense));
    /* getCurrencies().then(({ currencies }) => {
      const arr = Object.entries(currencies)
      .map((d) => d[1])
      .filter((moeda) => moeda.codein !== "BRLT");
      this.setState({
        expense: {
          ...expense,
          id: currentId,
          exchangeRates: arr,
        },
        currentId: currentId + PROX_ID,
      });
    }).then(() => {
      addExpense(expense);
    }); */
  }

  renderValueInput() {
    return (
      <label htmlFor="value-input">
        Valor:
        <input
          type="number"
          data-testid="value-input"
          id="value-input"
          onChange={ this.handleExpense }
          name="value"
        />
      </label>
    );
  }

  renderDescriptionInput() {
    return (
      <label htmlFor="description-input">
        Descrição:
        <input
          type="text"
          data-testid="description-input"
          id="description-input"
          onChange={ this.handleExpense }
          name="description"
        />
      </label>
    );
  }

  renderMethodInput() {
    return (
      <label htmlFor="method-input">
        Método:
        <select
          id="method-input"
          data-testid="method-input"
          onChange={ this.handleExpense }
          name="method"
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderTagInput() {
    return (
      <label htmlFor="tag-input">
        Categoria:
        <select
          id="tag-input"
          data-testid="tag-input"
          onChange={ this.handleExpense }
          name="tag"
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }

  render() {
    const { currencies } = this.state;
    // console.log(totalExpenses);
    return (
      <form className="form-header">
        { this.renderValueInput() }
        { this.renderDescriptionInput() }
        <label htmlFor="currency-input">
          Moeda Utilizada:
          <select
            data-testid="currency-input"
            id="currency-input"
            onChange={ this.handleExpense }
            name="currency"
          >
            { currencies.map((curr) => {
              const { code } = curr;
              return (
                <option
                  key={ code }
                  data-testid={ code }
                >
                  { code }
                </option>
              );
            }) }
          </select>
        </label>
        { this.renderMethodInput() }
        { this.renderTagInput() }
        <button type="button" onClick={ this.add }>Adicionar despesa</button>
      </form>
    );
  }
}

AddExpense.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  addExpense: (ex) => dispatch(AddAnExpenseAction(ex)),
});

/* const mapStateToProps = (state) => ({
  totalExpenses: state.wallet.expenses,
});

AddExpense.propTypes = {
  totalExpenses: PropTypes.arrayOf({
    id: PropTypes.number,
    value: PropTypes.number,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.object,
  }).isRequired,
}; */

AddExpense.propTypes = {
  addExpense: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(AddExpense);
