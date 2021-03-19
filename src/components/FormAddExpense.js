import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrency as getCurrencyThunk } from '../actions';

class FormAddExpense extends Component {
  constructor(props) {
    super(props);

    this.renderInputSelectCurrency = this.renderInputSelectCurrency.bind(this);
  }

  componentDidMount() {
    const { getCurrency } = this.props;
    getCurrency();
  }

  renderInputValue() {
    const { fields: { value } } = this.props;
    return (
      <input
        type="number"
        name="value"
        value={ value }
        data-testid="value-input"
        placeholder="Despesa"
      />
    );
  }

  renderInputDescription() {
    const { fields: { description } } = this.props;
    return (
      <input
        type="text"
        name="value"
        value={ description }
        data-testid="value-input"
        placeholder="Descrição"
      />
    );
  }

  renderInputSelectCurrency() {
    const { fields: { currency } } = this.props;
    const { currencies } = this.props;
    console.log(this.props);
    return (
      <select
        name="value"
        value={ currency }
        data-testid="value-input"
        placeholder="Despesa"
      >
        {
          currencies.map((curr) => (
            <option key={ curr } value={ curr }>{curr}</option>
          ))
        }
      </select>
    );
  }

  render() {
    // const { currencies, isFetching, fields } = this.props;
    return (
      <form action="">
        <input data-testid="value-input" type="number" placeholder="Valor" />

        <input data-testid="description-input" type="text" placeholder="Descrição" />

        {/* 3. Ao ser clicado, o botão deve fazer uma requisição à API
        para trazer o câmbio mais atualizado possível. */}
        {this.renderInputSelectCurrency()}

        <select name="method" id="method" data-testid="method-input">
          <option value="money">Dinheiro</option>
          <option value="credit-card">Cartão de crédito</option>
          <option value="debit-card">Cartão de dédito</option>
        </select>

        <select name="tags" id="tags" data-testid="tag-input">
          <option value="food">Alimentação</option>
          <option value="recreation">Lazer</option>
          <option value="work">Trabalho</option>
          <option value="transport">Transporte</option>
          <option value="health">Saúde</option>
        </select>

        <button type="button">
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
  fields: state.wallet.fields,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(getCurrencyThunk()),
});

FormAddExpense.propTypes = {
  getCurrency: PropTypes.func.isRequired,
  fields: PropTypes.shape({
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  }).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  // isFetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormAddExpense);

/* 1. salva as informações da despesa no estado global */
/* 2. atualiza a soma de despesas no header. */
/* 4. Os valores dos campos devem ser salvos no estado da aplicação,
      na chave expenses, dentro de um array contendo todos gastos que serão
      adicionados
        4.a O id da despesa deve ser um número sequencial, começando em 0. Ou seja: a primeira despesa terá id 0, a segunda terá id 1, a terceira id 2, e assim por diante.
        4.b Você deverá salvar a cotação do câmbio feita no momento da adição para ter esse dado quando for efetuar uma edição do gasto. Caso você não tenha essa informação salva, o valor da cotação trazida poderá ser diferente do obtido anteriormente.
      */

// {
//   currencies
//     .map((currency) => ({(
//       <option value={ currency.code } data-testid={ currency.code }>
//         {currency.code}
//       </option>
//     )})
// }
