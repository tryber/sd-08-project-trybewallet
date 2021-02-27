import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dataCambio from '../../Data';
import './Form.css';
import { saveExpenses } from '../../actions/index';

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      cambio: dataCambio,
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChange = this.handleChange.bind(this);
    this.inputValor = this.inputValor.bind(this);
    this.inputDescricao = this.inputDescricao.bind(this);
  }

  attId() {
    const { id } = this.props;
    this.setState({
      id: id + 1,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  inputValor() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor:
        <input
          onChange={ this.handleChange }
          value={ value }
          id="value"
          className="despesa"
          type="number"
          data-testid="value-input"
        />
      </label>
    );
  }

  inputDescricao() {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          value={ description }
          onChange={ this.handleChange }
          id="description"
          className="description"
          type="text"
          data-testid="description-input"
        />
      </label>
    );
  }

  inputCambio() {
    const { cambio, currency } = this.state;
    return (
      <label htmlFor="cambio">
        Câmbio:
        <select
          id="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {cambio.map((e) => (
            <option
              key={ e }
              data-testid={ e }
            >
              {e}
            </option>))}
        </select>
      </label>
    );
  }

  inputPagamento() {
    const { method } = this.state;
    return (
      <label htmlFor="metodo-pagamento">
        Método de pagamento:
        <select
          data-testid="method-input"
          value={ method }
          onChange={ this.handleChange }
          id="method"
        >
          <option>Dinheiro</option>
          <option>Cartão de Crédito</option>
          <option>Cartão de Débito</option>
        </select>
      </label>
    );
  }

  inputTag() {
    const { tag } = this.state;
    return (
      <label htmlFor="despesa">
        Tipo:
        <select
          data-testid="tag-input"
          id="tag"
          onChange={ this.handleChange }
          value={ tag }
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
    const { saveExpensesReducer } = this.props;
    return (
      <form className="formulario">
        {this.inputValor()}
        {this.inputDescricao()}
        {this.inputCambio()}
        {this.inputPagamento()}
        {this.inputTag()}
        <button
          type="button"
          onClick={ () => {
            saveExpensesReducer(this.state);
            this.attId();
          } }
        >
          Adicionar Despesa
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  id: PropTypes.string.isRequired,
  saveExpensesReducer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveExpensesReducer: (value) => dispatch(saveExpenses(value)),
});
const mapStateToProps = (state) => ({
  id: state.wallet.expenses.length,
  state,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
