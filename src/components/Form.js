import React from 'react';
import { connect } from 'react-redux';
import { fetchEconomia, walletExpense } from '../actions';
import TableWallet from './TableWallet';

const expenses = [{
  id: 0,
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {
    m: {
    },
  },
}];

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      moeda: [],
      ...expenses,
    };

    this.hundleOnClick = this.hundleOnClick.bind(this);
    this.renderInputValor = this.renderInputValor.bind(this);
    this.renderInputDescricao = this.renderInputDescricao.bind(this);
    this.renderSelectPagamento = this.renderSelectPagamento.bind(this);
    this.renderTag = this.renderTag.bind(this);
  }

  componentDidMount() {
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((responde) => responde.json())
      .then((data) => this.setState({
        moeda: Object.entries(data),
      }));
  }

  hundleOnClick({ target: { name, value } }) {
    this.setState((oi) => ({
      id: oi.id + 1,
      [name]: value,
      [name]: value,
      [name]: value,
      [name]: value,
      [name]: value,
    }));
  }

  renderInputValor() {
    return (
      <label htmlFor="value">
        Valor:
        <input
          id="value"
          name="value"
          onChange={ this.hundleOnClick }
          type="text"
          data-testid="value-input"
        />
      </label>
    );
  }

  renderInputDescricao() {
    return (
      <label htmlFor="description">
        Descrição:
        <input
          id="description"
          name="description"
          onChange={ this.hundleOnClick }
          data-testid="description-input"
        />
      </label>
    );
  }

  renderSelectMoeda() {
    const { moeda } = this.state;
    return (
      <select
        id="currency-input"
        name="currency"
        data-testid="currency-input"
        onChange={ this.hundleOnClick }
      >
        {moeda.map((currency) => {
          if (currency === 'USDT') return '';
          return (
            <option key={ currency[0] } data-testid={ currency[0] }>
              {currency[0]}
            </option>
          );
        })}
      </select>
    );
  }

  renderSelectPagamento() {
    return (
      <label htmlFor="pagamento">
        Método de Pagamento:
        <select
          onChange={ this.hundleOnClick }
          name="method"
          id="pagamento"
          data-testid="method-input"
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderTag() {
    return (
      <label htmlFor="tag">
        Tag:
        <select
          name="tag"
          onChange={ this.hundleOnClick }
          data-testid="tag-input"
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
    const { ...expenses } = this.state;
    const { addWalletCurrencie, addWalletExpense } = this.props;
    return (
      <div>
        <form>
          { this.renderInputValor() }
          { this.renderInputDescricao() }
          { this.renderSelectMoeda() }
          { this.renderSelectPagamento() }
          { this.renderTag() }
          <button
            onClick={ () => (addWalletCurrencie() && addWalletExpense(expenses)) }
            type="button"
          >
            Adicionar despesa
          </button>
        </form>
        <TableWallet />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  readWallet: state,
});

const mapDispatchToProps = (dispatch) => ({
  addWalletExpense: (value) => dispatch(walletExpense(value)),
  addWalletCurrencie: (value) => dispatch(fetchEconomia(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
