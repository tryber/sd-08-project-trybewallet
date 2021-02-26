import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpenses, fetchCurrencies, statusToFalse, editComplete } from '../actions';

class InputList extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.loadEditItem = this.loadEditItem.bind(this);
    this.defaultState = {
      valor: 0,
      moeda: 'USD',
      metodo: 'Cartao Credito',
      tag: 'Alimentação',
      descricao: '',
    };
    this.state = this.defaultState;
  }

  componentDidUpdate() {
    const { edit: { status } } = this.props;
    if (status) {
      this.loadEditItem();
    }
  }

  loadEditItem() {
    const { edit: { item } } = this.props;
    const { editingDispatch } = this.props;
    this.setState(() => (
      {
        valor: item.value,
        moeda: item.currency,
        metodo: item.method,
        tag: item.tag,
        descricao: item.description,
      }
    ), () => {
      editingDispatch();
    });
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

  handleEditClick(item) {
    const { valor, moeda, metodo, tag, descricao } = this.state;
    const { editCompleted, expenses } = this.props;
    const findItem = expenses.find(({ id }) => id === item.id);
    findItem.value = valor;
    findItem.currency = moeda;
    findItem.method = metodo;
    findItem.tag = tag;
    findItem.description = descricao;
    editCompleted(expenses);
    this.setState(() => (this.defaultState));
  }

  renderValor() {
    const { valor } = this.state;
    return (
      <li>
        <p>Gasto</p>
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
        <p>Cambio</p>
        <select
          name="moeda"
          id="moeda"
          data-testid="currency-input"
          value={ moeda }
          onChange={ this.handleChange }
        >
          { onlyCurrenciesKeys.map((curr) => (
            <option
              key={ curr }
              value={ curr }
              data-testid={ curr }
            >
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
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
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
        <p>Tipo</p>
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
        <p>Descricao dos Gastos</p>
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

  renderAddBtn() {
    return (
      <button
        type="button"
        onClick={ this.handleClick }
      >
        Adicionar Despesa
      </button>
    );
  }

  renderEditBtn(item) {
    return (
      <button
        type="button"
        onClick={ () => this.handleEditClick(item) }
      >
        Editar despesa
      </button>
    );
  }

  render() {
    const { edit } = this.props;
    const { btnStatus, item } = edit;
    return (
      <>
        {this.renderValor()}
        {this.renderMoeda()}
        {this.renderMetodo()}
        {this.renderTag()}
        {this.renderDescricao()}
        {
          btnStatus ? this.renderEditBtn(item) : this.renderAddBtn()
        }
      </>
    );
  }
}
InputList.propTypes = {
  currencies: PropTypes.objectOf(PropTypes.object).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  addExpense: PropTypes.func.isRequired,
  apiFetch: PropTypes.func.isRequired,
  edit: PropTypes.objectOf(PropTypes.any).isRequired,
  editingDispatch: PropTypes.func.isRequired,
  editCompleted: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  edit: state.wallet.edit,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (obj) => dispatch(addExpenses(obj)),
  apiFetch: () => dispatch(fetchCurrencies()),
  editingDispatch: () => dispatch(statusToFalse()),
  editCompleted: (arr) => dispatch(editComplete(arr)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputList);
