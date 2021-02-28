import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AddGastos extends Component {
  constructor() {
    super();
    this.state = {
      arrFinal: [],
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
    this.getAPI = this.getAPI.bind(this);
    this.getCodesFromAPI = this.getCodesFromAPI.bind(this);
  }

  async getAPI() {
    const teste = await fetch('https://economia.awesomeapi.com.br/json/all');
    const teste2 = await teste.json();
    return teste2;
  }

  async getCodesFromAPI() {
    const a = await this.getAPI();
    const promisse = Object.values(a);
    const arr1 = Object.values(promisse);
    const arr = [];
    for (let i = 0; i < arr1.length; i += 1) {
      arr.push(Object.values(arr1[i]));
    }
    const arrFinal = [];
    for (let i = 0; i < arr.length; i += 1) {
      arrFinal.push(arr[i][0]);
    }
    this.setState({
      arrFinal,
    });
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
    const { arrFinal } = this.state;
    return (
      <div>
        Moeda:
        <select
          data-testid="currency-input"
          name="moeda"
          onChange={ (event) => this.change(event) }
        >
          {arrFinal.map((moeda) => (moeda !== 'USDT') && (
            (
              <option key={ moeda } value={ moeda } data-testid={ moeda }>
                {moeda}
              </option>
            )
          ))}
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
    this.getCodesFromAPI();
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

AddGastos.propTypes = {
  expenses: PropTypes.func.isRequired,
};
