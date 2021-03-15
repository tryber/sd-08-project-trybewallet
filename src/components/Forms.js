import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, getExpenses, fetchCurrency } from '../actions/requestAPI';
import { editExpensesEnd } from '../actions/editExpenses';

class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: {
        id: 0,
        value: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
      },
    };
    this.onlyNumber = this.onlyNumber.bind(this);
    this.updateState = this.updateState.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.currenciesRendered = this.currenciesRendered.bind(this);
  }

  componentDidMount() {
    const { requestAPI } = this.props;
    requestAPI();
  }

  componentDidUpdate(prevProps, prevState) {
    const { wallet, expensesLength } = this.props;
    if (prevProps.wallet.idEditable !== prevState.expenses.id && wallet.isEditable) {
      expensesLength.forEach((expense) => {
        if (expense.id === wallet.idEditable) {
          this.setState({
            expenses: {
              id: wallet.idEditable,
              value: expense.value,
              currency: expense.currency,
              method: expense.method,
              tag: expense.tag,
              description: expense.description,
            },
          });
        }
      });
    }
  }

  onlyNumber(event) {
    const theEvent = event || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    const regex = /^[0-9.]+$/;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  async handleClick() {
    const {
      requestCurrency,
      addExpenses,
      expensesLength,
      wallet,
      editExpenses,
    } = this.props;
    if (wallet.isEditable) {
      const { expenses } = this.state;
      editExpenses(expenses);
    } else {
      const rates = await requestCurrency();
      this.setState((state) => ({
        expenses: {
          ...state.expenses,
          id: expensesLength.length,
          exchangeRates: rates.payload,
        },
      }));
      const { expenses } = this.state;
      addExpenses(expenses);
    }
    this.setState({
      expenses: {
        id: 0,
        value: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
      },
    });
  }

  changeHandler(event) {
    const { name, value } = event.target;

    this.updateState(name, value);
  }

  updateState(name, value) {
    this.setState((state) => ({
      expenses: {
        ...state.expenses,
        [name]: value,
      },
    }));
  }

  currenciesRendered(currency, changeHandler) {
    const { currencies } = this.props;
    return (
      <select
        name="currency"
        value={ currency }
        data-testid="currency-input"
        onChange={ changeHandler }
      >
        { currencies.map((expenseCurrency) => (
          <option
            key={ expenseCurrency }
            data-testid={ expenseCurrency }
          >
            { expenseCurrency }
          </option>
        )) }
      </select>
    );
  }

  render() {
    const { expenses: { value, description, currency } } = this.state;
    const { wallet } = this.props;
    return (
      <div className="form-group">
        Valor da Despesa:
        <input
          name="value"
          data-testid="value-input"
          type="text"
          value={ value }
          onKeyPress={ this.onlyNumber }
          onChange={ this.changeHandler }
        />
        Descrição da Despesa:
        <input
          name="description"
          data-testid="description-input"
          type="text"
          value={ description }
          onChange={ this.changeHandler }
        />
        <span>Moeda da Despesa:</span>
        { this.currenciesRendered(currency, this.changeHandler) }
        <span>Método de Pagamento:</span>
        <select name="method" data-testid="method-input" onChange={ this.changeHandler }>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <span>Tipo de Despesa:</span>
        <select
          name="tag"
          data-testid="tag-input"
          onChange={ this.changeHandler }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button type="button" onClick={ this.handleClick }>
          { wallet.isEditable ? 'Editar despesa' : 'Adicionar despesa' }
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expensesLength: state.wallet.expenses,
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  requestAPI: () => dispatch(fetchCurrencies()),
  requestCurrency: () => dispatch(fetchCurrency()),
  addExpenses: (expenses) => dispatch(getExpenses(expenses)),
  editExpenses: (expenses) => dispatch(editExpensesEnd(expenses)),
});

Forms.defaultProps = {
  wallet: {
    isFetching: false,
    idEditable: false,
    isEditable: false,
  },
};

Forms.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  wallet: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    idEditable: PropTypes.string.isRequired,
    isEditable: PropTypes.bool.isRequired,
  }),
  expensesLength: PropTypes.arrayOf(PropTypes.number).isRequired,
  requestAPI: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
  editExpenses: PropTypes.func.isRequired,
  requestCurrency: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
