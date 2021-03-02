import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FormWallet extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   valor: 0,
    // };

    this.valor = this.valor.bind(this);
    this.descricao = this.descricao.bind(this);
    this.moeda = this.moeda.bind(this);
    this.categorias = this.categorias.bind(this);
    this.pagamentos = this.pagamentos.bind(this);
    this.botoes = this.botoes.bind(this);
  }

  valor(valor, handleChange) {
    console.log('valor', this.props);
    return (
      <label htmlFor="valor">
        Valor:
        <input
          type="number"
          name="valor"
          value={ valor }
          data-testid="value-input"
          onChange={ (event) => handleChange(event) }
        />
      </label>
    );
  }

  descricao(descricao, handleChange) {
    return (
      <label htmlFor="descricao">
        Descrição:
        <input
          type="text"
          name="descricao"
          value={ descricao }
          data-testid="description-input"
          onChange={ (event) => handleChange(event) }
        />
      </label>
    );
  }

  moeda(moeda, arrayMoedas, handleChange) {
    return (
      <label htmlFor="moeda">
        Moeda:
        <select
          name="moeda"
          value={ moeda }
          data-testid="currency-input"
          onChange={ (event) => handleChange(event) }
        >
          {arrayMoedas.map((moedas) => (
            <option
              key={ moedas }
              value={ moedas }
              data-testid={ moedas }
            >
              {moedas}
            </option>
          ))}
        </select>
      </label>
    );
  }

  categorias(categoria, handleChange) {
    return (
      <label htmlFor="categoria">
        Categoria:
        <select
          name="categoria"
          value={ categoria }
          data-testid="tag-input"
          onChange={ (event) => handleChange(event) }
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

  pagamentos(pagamentos, handleChange) {
    return (
      <label htmlFor="pagamentos">
        Método de Pagamento:
        <select
          name="pagamentos"
          data-testid="method-input"
          value={ pagamentos }
          onChange={ (event) => handleChange(event) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  botoes(btBool, handleSubmit) {
    return (
      <div>
        { (!btBool)
          ? (
            <button
              type="button"
              onClick={ (event) => handleSubmit(event) }
            >
              Adicionar despesa
            </button>)
          : (
            <button
              type="button"
              onClick={ (event) => handleSubmit(event) }
            >
              Editar despesa
            </button>
          )}
      </div>
    );
  }

  render() {
    const { arrayMoedas, handleChange, handleClick, state, btBool } = this.props;
    const { descricao, moeda, pagamentos, categoria, valor } = this.props;
    console.log(arrayMoedas);
    return (
      <div>
        { this.valor(valor, handleChange) }
        { this.descricao(descricao, handleChange) }
        { this.moeda(moeda, arrayMoedas, handleChange) }
        { this.categorias(categoria, handleChange) }
        { this.pagamentos(pagamentos, handleChange) }
        <p>{ this.botoes(state, btBool, handleClick) }</p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  btBool: state.wallet.btBool,
  arrayMoedas: state.wallet.currencies,
});

FormWallet.propTypes = {
  arrayMoedas: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
  btBool: PropTypes.bool.isRequired,
  descricao: PropTypes.string.isRequired,
  moeda: PropTypes.string.isRequired,
  pagamentos: PropTypes.string.isRequired,
  categoria: PropTypes.string.isRequired,
  valor: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  state: PropTypes.shape({
    expense: PropTypes.shape({
      valor: PropTypes.number,
      descricao: PropTypes.string,
      moeda: PropTypes.string,
      pagamentos: PropTypes.string,
      categoria: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, null)(FormWallet);
