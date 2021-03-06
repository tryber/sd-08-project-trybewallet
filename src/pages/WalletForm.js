import React from 'react';
import { connect } from 'react-redux';
import { addExpensesThunk } from '../actions';

class WalletForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  // functions that render form.
  inputValue() {
    const { value } = this.state;
    return (
      <label htmlFor="despesa-input">
        Valor
        <input
          onChange={ this.handleChange }
          name="value"
          id="despesa-input"
          type="text"
          data-testid="value-input"
          value={ value }
        />
      </label>
    );
  }

  inputDescription() {
    const { description } = this.state;
    return (
      <label htmlFor="descricao-despesa">
        Descrição
        <input
          onChange={ this.handleChange }
          name="description"
          id="descricao-despesa"
          type="text"
          data-testid="description-input"
          value={ description }
        />
      </label>
    );
  }

  inpuCoins() {
    const { currency } = this.state;
    const { currenciesStore } = this.props;
    return (
      <label htmlFor="coins">
        Moeda
        <select
          onChange={ this.handleChange }
          name="currency"
          id="coins"
          data-testid="currency-input"
          value={ currency }
        >
          {currenciesStore.map((value) => (
            <option
              key={ value }
              data-testid={ value }
            >
              {value}
            </option>
          ))}
        </select>
      </label>
    );
  }

  paymentMethod() {
    const { method } = this.state;
    return (
      <label htmlFor="metodo-pagamento">
        Método de pagamento
        <select
          onChange={ this.handleChange }
          name="method"
          id="metodo-pagamento"
          data-testid="method-input"
          value={ method }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }

  category() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag">
        Categoria
        <select
          onChange={ this.handleChange }
          name="tag"
          id="tag"
          data-testid="tag-input"
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

  handleClick() {
    const { addExpensesStore } = this.props;
    addExpensesStore(this.state);
    this.setState({ value: '' });
  }

  render() {
    return (
      <>
        {this.inputValue()}
        {this.inputDescription()}
        {this.inpuCoins()}
        {this.paymentMethod()}
        {this.category()}

        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpensesStore: (state) => dispatch(addExpensesThunk(state)),
});

const mapStateToProps = (state) => ({
  currenciesStore: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
