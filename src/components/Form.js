import React from 'react';
import { connect } from 'react-redux';
import { fetchEconomia, walletExpense } from '../actions';
import TableWallet from './TableWallet';

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.hundleOnClick = this.hundleOnClick.bind(this);
    this.renderInputValor = this.renderInputValor.bind(this);
    this.renderInputDescricao = this.renderInputDescricao.bind(this);
    this.renderSelectPagamento = this.renderSelectPagamento.bind(this);
    this.renderTag = this.renderTag.bind(this);
    this.renderDispatch = this.renderDispatch.bind(this);
  }

  componentDidMount() {
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((responde) => responde.json())
      .then((data) => this.setState({
        exchangeRates: data,
      }));
  }

  hundleOnClick({ target: { name, value } }) {
    this.setState(() => ({
      [name]: value,
    }));
  }

  renderDispatch() {
    const { id } = this.state;
    const { addWalletCurrencie, addWalletExpense } = this.props;
    addWalletCurrencie();
    addWalletExpense(this.state);
    this.setState({
      id: id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  renderInputValor() {
    return (
      <label htmlFor="value">
        Valor:
        <input
          id="value"
          name="value"
          value={ this.state.value }
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
          value={ this.state.description }
          name="description"
          onChange={ this.hundleOnClick }
          data-testid="description-input"
        />
      </label>
    );
  }

  renderSelectMoeda() {
    const { exchangeRates } = this.state;

    return (
      <select
        id="currency-input"
        value={ this.state.currency }
        name="currency"
        data-testid="currency-input"
        onChange={ this.hundleOnClick }
      >
        {Object.entries(exchangeRates).map((currency) => {
          if (currency[0] === 'USDT') return '';
          return (
            <option key={ currency[0] } data-testid={ `${currency[0]}` }>
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
          value={ this.state.method }
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
      <label htmlFor>
        Tag:
        <select
          name="tag"
          value={ this.state.tag }
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
    return (
      <div>
        <form>
          { this.renderInputValor() }
          { this.renderInputDescricao() }
          { this.renderSelectMoeda() }
          { this.renderSelectPagamento() }
          { this.renderTag() }
          <button
            onClick={ this.renderDispatch }
            type="button"
          >
            Adicionar despesa
          </button>
        </form>

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
