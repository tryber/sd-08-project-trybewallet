import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { infoWalletAction } from '../actions/wallet';
import '../styles/Formularios.css';

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

      <label htmlFor="despesa" className="form-label">
        Valor:
        <input
          type="number"
          data-testid="value-input"
          id="despesa"
          name="value"
          className="form-control"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>

    );
  }

  moeda() {
    const { wallet } = this.props;
    const { currencies } = wallet;
    const { currency } = this.state;
    const moedasFiltro = currencies.filter((moeda) => moeda !== 'USDT');
    return (
      <label htmlFor="moeda" className="form-label">
        Moeda:
        <select
          data-testid="currency-input"
          id="moeda"
          name="currency"
          onChange={ this.handleChange }
          value={ currency }
          className="form-select"
        >
          <option>Selecione</option>
          {moedasFiltro.map((e) => (
            <option
              key={ e }
              data-testid={ e }
              value={ e }

            >
              {e}
            </option>))}
        </select>
      </label>
    );
  }

  pagamento() {
    const { method } = this.state;
    return (
      <label htmlFor="pag">
        Método de Pagamento:
        <select
          id="pag"
          data-testid="method-input"
          name="method"
          onChange={ this.handleChange }
          value={ method }
          className="form-select"
        >
          <option>Selecione</option>
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>

        </select>
      </label>
    );
  }

  tag() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag" className="form-label">
        Tag:
        <select
          id="tag"
          data-testid="tag-input"
          name="tag"
          onChange={ this.handleChange }
          value={ tag }
          className="form-select"
        >
          <option>Selecione</option>
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
    const { description } = this.state;
    return (

      <label htmlFor="descricao" className="form-label">
        Descrição:
        <input
          data-testid="description-input"
          className="form-control"
          id="descricao"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>

    );
  }

  async handleClick() {
    this.setState((estadoAnterior) => ({
      id: estadoAnterior.id + 1,
    }));
    const { expense } = this.props;
    expense(this.state);
    this.setState((state) => ({ ...state,
      value: '0',
      currency: '',
      method: '',
      tag: '',
      description: '',
      exchangeRates: {} }));
  }

  botao() {
    const { handleClick } = this;

    return (
      <button
        type="button"
        onClick={ handleClick }
        className="btn btn-light"
      >
        Adicionar despesa
      </button>);
  }

  render() {
    return (
      <div className="container">
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
