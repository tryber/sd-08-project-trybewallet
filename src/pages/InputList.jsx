import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpenses, fetchCurrencies } from '../actions';

class InputList extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.defaultState = {
      valor: 0,
      moeda: 'USD',
      metodo: 'Cartao Credito',
      tag: 'Alimentação',
      descricao: '',
    };
    this.state = this.defaultState;
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }));
  }

  async handleClick() {
    const { apiFetch, addExpense } = this.props;
    await apiFetch();
    const { currencies, expenses } = this.props;
    const { valor, moeda, metodo, tag, descricao } = this.state;
    const nextId = expenses.length;
    const expense = {
      id: nextId,
      value: valor,
      description: descricao,
      currency: moeda,
      method: metodo,
      tag,
      exchangeRates: { ...currencies },
    };
    addExpense(expense);
    this.setState(() => (this.defaultState));
  }

  renderValor() {
    const { valor } = this.state;
    return (
      <li>
        <p>Valor</p>
        <input
          type="text"
          name="valor"
          data-testid="value-input"
          value={ valor }
          onChange={ this.handleChange }
        />
      </li>
    );
  }

  renderMoeda() {
    const { currencies } = this.props;
    const onlyCurrenciesKeys = Object.keys(currencies);
    const { moeda } = this.state;
    return (
      <li>
        <p>Moeda</p>
        <select
          name="moeda"
          id="moeda"
          data-testid="currency-input"
          value={ moeda }
          onChange={ this.handleChange }
        >
          { onlyCurrenciesKeys.map((curr) => (
            <option key={ curr } value={ curr }>
              {curr}
            </option>
          ))}
        </select>
      </li>
    );
  }

  renderMetodo() {
    const { metodo } = this.state;
    return (
      <li>
        <p>Metodo de Pagamento</p>
        <select
          name="metodo"
          id="metodo"
          data-testid="method-input"
          value={ metodo }
          onChange={ this.handleChange }
        >
          <option value="Cartao Credito">Cartao Credito</option>
          <option value="Cartao Debito">Cartao Debito</option>
          <option value="Dinheiro">Dinheiro</option>
        </select>
      </li>
    );
  }

  renderTag() {
    const { tag } = this.state;
    const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <li>
        <p>Tag</p>
        <select
          name="tag"
          id="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ this.handleChange }
        >
          { tagOptions.map((tagOption) => (
            <option key={ tagOption } value={ tagOption }>
              { tagOption }
            </option>
          ))}
        </select>
      </li>
    );
  }

  renderDescricao() {
    const { descricao } = this.state;
    return (
      <li>
        <p>Descrição</p>
        <input
          type="text"
          name="descricao"
          data-testid="description-input"
          value={ descricao }
          onChange={ this.handleChange }
        />
      </li>
    );
  }

  render() {
    return (
      <>
        {this.renderValor()}
        {this.renderMoeda()}
        {this.renderMetodo()}
        {this.renderTag()}
        {this.renderDescricao()}
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar Despesa
        </button>
      </>
    );
  }
}
InputList.propTypes = {
  currencies: PropTypes.objectOf(PropTypes.object).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  addExpense: PropTypes.func.isRequired,
  apiFetch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});
const mapDispatchToProps = (dispatch) => ({
  addExpense: (obj) => dispatch(addExpenses(obj)),
  apiFetch: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputList);
