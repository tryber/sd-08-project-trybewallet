import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEditExpense as addEditExpenseAction,
  editExpense as editExpenseAction } from '../actions/wallet';

class FormularioEdicao extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      value: '0',
      currency: '',
      method: '',
      tag: '',
      description: '',
      exchangeRates: {},
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.alteraState = this.alteraState.bind(this);
  }

  componentDidMount() {
    this.alteraState();
  }

  alteraState() {
    const { expenseEdit } = this.props;
    console.log(expenseEdit);

    this.setState({
      ...expenseEdit,
    });
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
    const { currency } = this.state;
    const moedasFiltro = currencies.filter((moeda) => moeda !== 'USDT');
    return (
      <label htmlFor="moeda">
        Moeda:
        <select
          data-testid="currency-input"
          id="moeda"
          name="currency"
          onChange={ this.handleChange }
          value={ currency }
        >
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
    const { tag } = this.state;
    return (
      <label htmlFor="tag">
        Tag:
        <select
          id="tag"
          data-testid="tag-input"
          name="tag"
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

  descricao() {
    const { description } = this.state;
    return (
      <label htmlFor="descricao">
        Descrição:
        <input
          data-testid="description-input"
          id="descricao"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  handleClick() {
    const { addEditExpense, editExpense } = this.props;
    addEditExpense(this.state);
    editExpense({});
  }

  botao() {
    const { handleClick } = this;

    return (
      <button type="button" onClick={ handleClick }>Editar despesa</button>
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
  wallet: state.wallet,
  expenseEdit: state.wallet.expenseEdit });

const mapDispatchToProps = (dispatch) => ({
  editExpense: (payload) => dispatch(editExpenseAction(payload)),
  addEditExpense: (payload) => dispatch(addEditExpenseAction(payload)),
});

FormularioEdicao.propTypes = {
  wallet: PropTypes.shape().isRequired,
  editExpense: PropTypes.func.isRequired,
  addEditExpense: PropTypes.func.isRequired,
  expenseEdit: PropTypes.objectOf().isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(FormularioEdicao);
