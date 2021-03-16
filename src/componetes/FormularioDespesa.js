import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getCoin from '../services/getCoin';
import infoWalletAction from '../actions/expenses';

class FormularioDespesa extends React.Component {
  constructor() {
    super();
    this.state = {
      id: -1,
      value: '0',
      currency: '',
      method: '',
      tag: '',
      description: '',
      exchangeRates: {},
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  despesa() {
    const { value } = this.state;
    return (
      <label htmlFor="despesa">
        Valor:
        <input
          type="number"
          data-testid="value-input"
          id="despesa"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  moeda() {
    const { wallet } = this.props;
    const { currencies } = wallet;
    const moedas = Object.values(currencies);
    const moedasFiltro = moedas.filter((moeda) => moeda.name !== 'Dólar Turismo');
    return (
      <label htmlFor="moeda">
        Moeda:
        <select
          data-testid="currency-input"
          id="moeda"
          name="currency"
          onChange={ this.handleChange }
        >
          {moedasFiltro.map(({ code }) => (
            <option
              key={ code }
              data-testid={ code }
              value={ code }

            >
              {code}
            </option>))}
        </select>
      </label>
    );
  }

  pagamento() {
    return (
      <label htmlFor="pag">
        Método de Pagamento:
        <select
          id="pag"
          data-testid="method-input"
          name="method"
          onChange={ this.handleChange }
        >
          <option>
            Dinheiro
          </option
          >
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>

        </select>
      </label>
    );
  }

  tag() {
    return (
      <label htmlFor="tag">
        Tag:
        <select
          id="tag"
          data-testid="tag-input"
          name="tag"
          onChange={ this.handleChange }
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

  descricao() {
    return (
      <label htmlFor="descricao">
        Descrição da Despesa
        <input
          data-testid="description-input"
          id="descricao"
          name="description"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  async handleClick() {
    const obj = await getCoin();
    this.setState((estadoAnterior) => ({
      exchangeRates: obj,
      id: estadoAnterior.id + 1,
    }));
    const { expense } = this.props;
    expense(this.state);
    this.setState({ value: '0' });
  }

  botao() {
    const { handleClick } = this;

    return (
      <button type="button" onClick={ handleClick }>Adicionar despesa</button>
    );
  }

  render() {
    return (
      <div>
        <form>
          {this.despesa()}
          {this.moeda()}
          {this.pagamento()}
          {this.tag()}
          {this.descricao()}
          {this.botao()}
        </form>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet });

const mapDispatchToProps = (dispatch) => ({
  expense: (value) => dispatch(infoWalletAction(value)),
});

FormularioDespesa.propTypes = {
  wallet: PropTypes.shape().isRequired,
  expense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormularioDespesa);
