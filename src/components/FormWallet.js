import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class FormWallet extends React.Component {
  constructor(props) {
    super(props);
    this.valor = this.valor.bind(this);
    this.descricao = this.descricao.bind(this);
    this.moeda = this.moeda.bind(this);
    this.categorias = this.categorias.bind(this);
    this.pagamentos = this.pagamentos.bind(this);
    this.botoes = this.botoes.bind(this);
  }

  // const { arrayCoins } = this.props;
  valor() {
    return (
      <label htmlFor="value-input">
        Valor:
        <input
          type="number"
          // value={ valor }
          data-testid="value-input"
          // onChange={ (event) => handleChange(event) }
        />
      </label>
    );
  }

  descricao() {
    return (
      <label htmlFor="description-input">
        Descrição:
        <input
          type="text"
          // value={ descricao }
          data-testid="description-input"
          // onChange={ (event) => handleChange(event) }
        />
      </label>
    );
  }

  moeda() {
    return (
      <label htmlFor="currency-input">
        Moeda:
        <input
          data-testid="currency-input"
          // onChange={ (event) => handleChange(event) }
        />
        {/* {arrayMoedas.map((moeda) => (
          <option
            key={ moeda }
            value={ moeda }
            data-testid={ moeda }
          >
            {moeda}
          </option>
        ))} */}
      </label>
    );
  }

  categorias() {
    return (
      <label htmlFor="tag-input">
        Categoria:
        <select
          data-testid="tag-input"
          // value={ tag }
          // onChange={ (event) => handleChange(event) }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  pagamentos() {
    return (
      <label htmlFor="method-input">
        Método de Pagamento:
        <select
          data-testid="method-input"
          // value={ pagamentos }
          // onChange={ (event) => handleChange(event) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  botoes() {
    return (
      <div>
        <button
          type="button"
          // onClick={ (event) => handleClick(event) }
        >
          Adicionar despesa
        </button>
        <button
          type="button"
          // onClick={ (event) => handleClick(event) }
        >
          Editar despesa
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        { this.valor() }
        { this.descricao() }
        { this.moeda() }
        { this.categorias() }
        { this.pagamentos() }
        <p>{ this.botoes() }</p>
      </div>
    );
  }
}

export default connect(null, null)(FormWallet);
