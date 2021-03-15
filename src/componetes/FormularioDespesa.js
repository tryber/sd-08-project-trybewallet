import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FormularioDespesa extends React.Component {
  despesa() {
    return (
      <label htmlFor="despesa">
        Valor:
        <input type="number" data-testid="value-input" id="despesa" />
      </label>
    );
  }

  moeda() {
    const { wallet } = this.props;
    const moedas = Object.values(wallet);
    const moedasFiltro = moedas.filter((moeda) => moeda.name !== 'Dólar Turismo');
    return (
      <label htmlFor="moeda">
        Moeda:
        <select data-testid="currency-input" id="moeda">
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
        <select id="pag" data-testid="method-input">
          <option>Dinheiro</option>
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
        <select id="tag" data-testid="tag-input">
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
        <input data-testid="description-input" id="descricao" />
      </label>
    );
  }

  botao() {
    return (
      <button type="button">Adicionar despesa</button>
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
        </form>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet });

FormularioDespesa.propTypes = {
  wallet: PropTypes.shape().isRequired,

};

export default connect(mapStateToProps)(FormularioDespesa);
