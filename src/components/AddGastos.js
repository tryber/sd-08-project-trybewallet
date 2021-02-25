import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddGastos extends Component {
  constructor() {
    super();
    this.state = {
      valor: '',
      detalhes: '',
      moeda: '',
      pagamento: '',
      tipo: '',
    };
    this.inputsGastos = this.inputsGastos.bind(this);
    this.categoriaDespesa = this.categoriaDespesa.bind(this);
    this.tipoDeMoeda = this.tipoDeMoeda.bind(this);
    this.metodoPagamento = this.metodoPagamento.bind(this);
    this.change = this.change.bind(this);
  }

  metodoPagamento() {
    return (
      <div>
        Forma de pagamento:
        <select
          data-testid="method-input"
          name="pagamento"
          onChange={ (event) => this.change(event) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </div>);
  }

  tipoDeMoeda() {
    return (
      <div>
        Moeda:
        <select
          data-testid="currency-input"
          name="moeda"
          onChange={ (event) => this.change(event) }
        >
          <option data-testid="USD" value="USD">USD</option>
          <option data-testid="CAD" value="CAD">CAD</option>
          <option data-testid="EUR" value="EUR">EUR</option>
          <option data-testid="GBP" value="GBP">GBP</option>
          <option data-testid="ARS" value="ARS">ARS</option>
          <option data-testid="BTC" value="BTC">BTC</option>
          <option data-testid="LTC" value="LTC">LTC</option>
          <option data-testid="JPY" value="JPY">JPY</option>
          <option data-testid="CHF" value="CHF">CHF</option>
          <option data-testid="AUD" value="AUD">AUD</option>
          <option data-testid="CNY" value="CNY">CNY</option>
          <option data-testid="ILS" value="ILS">ILS</option>
          <option data-testid="XRP" value="XRP">XRP</option>
          <option data-testid="ETH" value="ETH">ETH</option>
        </select>
      </div>);
  }

  inputsGastos() {
    const { valor } = this.state;
    return (
      <div>
        <textarea
          className="textarea1"
          type="text"
          name="valor"
          value={ valor }
          placeholder="digite o gasto a ser adicionado"
          data-testid="value-input"
          onChange={ (event) => this.change(event) }
        />
        <br />
        <br />
        <textarea
          className="textarea2"
          type="text"
          name="detalhes"
          placeholder="detalhe aqui  o gasto acima"
          data-testid="description-input"
          onChange={ (event) => this.change(event) }
        />
      </div>
    );
  }

  categoriaDespesa() {
    return (
      <div>
        Tipo de despesa:
        <select
          data-testid="tag-input"
          name="tipo"
          onChange={ (event) => this.change(event) }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </div>);
  }

  change(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        {this.inputsGastos()}
        <br />
        {this.tipoDeMoeda()}
        <br />
        {this.metodoPagamento()}
        <br />
        <br />
        {this.categoriaDespesa()}

        <button
          type="button"
          onClick={ () => {
            expenses(this.state);
          } }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.email,
});

const mapDispatchToProps = (dispatch) => ({
  expenses: (expenses) => dispatch({ type: 'ADD_DESPESA', expenses }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddGastos);
