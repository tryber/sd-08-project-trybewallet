import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchEconomia, walletExpense } from '../actions';

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
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor:
        <input
          id="value"
          name="value"
          value={ value }
          onChange={ this.hundleOnClick }
          type="text"
          data-testid="value-input"
        />
      </label>
    );
  }

  renderInputDescricao() {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          id="description"
          value={ description }
          name="description"
          onChange={ this.hundleOnClick }
          data-testid="description-input"
        />
      </label>
    );
  }

  renderSelectMoeda() {
    const { exchangeRates, currency } = this.state;

    return (
      <select
        id="currency-input"
        value={ currency }
        name="currency"
        data-testid="currency-input"
        onChange={ this.hundleOnClick }
      >
        {Object.entries(exchangeRates).map((itemCurrency) => {
          if (itemCurrency[0] === 'USDT') return '';
          return (
            <option key={ itemCurrency[0] } data-testid={ `${itemCurrency[0]}` }>
              {itemCurrency[0]}
            </option>
          );
        })}
      </select>
    );
  }

  renderSelectPagamento() {
    const { method } = this.state;
    return (
      <label htmlFor="pagamento">
        Método de Pagamento:
        <select
          onChange={ this.hundleOnClick }
          value={ method }
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
    const { tag } = this.state;
    return (
      <label htmlFor>
        Tag:
        <select
          name="tag"
          value={ tag }
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

Form.propTypes = {
  addWalletCurrencie: PropTypes.arrayOf(PropTypes.object).isRequired,
  addWalletExpense: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
