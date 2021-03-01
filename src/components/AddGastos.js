import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AddGastos extends Component {
  constructor() {
    super();
    this.state = {
      auxiliar: {
        arrFinal: [],
        arrDeValores: [],
      },
      despesas: {
        id: 0,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: '',
      },
    };
    this.inputsGastos = this.inputsGastos.bind(this);
    this.categoriaDespesa = this.categoriaDespesa.bind(this);
    this.tipoDeMoeda = this.tipoDeMoeda.bind(this);
    this.metodoPagamento = this.metodoPagamento.bind(this);
    this.change = this.change.bind(this);
    this.getAPI = this.getAPI.bind(this);
    this.getCodesFromAPI = this.getCodesFromAPI.bind(this);
    this.getExchandesFromAPI = this.getCodesFromAPI.bind(this);
    this.acrescimoID = this.acrescimoID.bind(this);
    this.changeValor = this.changeValor.bind(this);
    this.resetValue = this.resetValue.bind(this);
    // this.getExchandesRates = this.getExchandesRates.bind(this);
  }

  componentDidMount() {
    this.getCodesFromAPI();
  }

  async getAPI() {
    const teste = await fetch('https://economia.awesomeapi.com.br/json/all');
    const teste2 = await teste.json();
    return teste2;
  }

  async getCodesFromAPI() {
    const { despesas } = this.state;
    const arr1 = Object.values(Object.values(await this.getAPI()));
    const arr = [];
    for (let i = 0; i < arr1.length; i += 1) {
      arr.push(Object.values(arr1[i]));
    }
    console.log();
    const arrFinal = [];
    const arrDeValores = [];
    for (let i = 0; i < arr.length; i += 1) {
      arrFinal.push(arr[i][0]);
      arrDeValores.push(arr[i][8]);
    }
    arrFinal.splice(1, 1);
    arrDeValores.splice(1, 1);
    this.setState({ auxiliar: {
      arrFinal,
      arrDeValores,
    },
    despesas: { ...despesas,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: await this.getAPI(),
    } });
  }

  // async getExchandesRates() {
  //   const { despesas } = this.state;
  //   const awaiit = await this.getAPI();
  //   const promisse = Object.values(awaiit);
  //   this.setState({ despesas: { ...despesas,
  //     exchangeRates: promisse,
  //   } });
  // }

  tipoDeMoeda() {
    const { auxiliar } = this.state;
    return (
      <div>
        Moeda:
        <select
          data-testid="currency-input"
          name="currency"
          value={ auxiliar.method }
          onChange={ (event) => {
            this.change(event);
          } }
        >
          {auxiliar.arrFinal.map((moeda) => (moeda !== 'USDT') && (
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
    const { despesas } = this.state;
    return (
      <div>
        <textarea
          className="textarea1"
          type="text"
          name="value"
          value={ despesas.value }
          placeholder="digite o gasto a ser adicionado"
          data-testid="value-input"
          onChange={ (event) => this.change(event) }
        />
        <br />
        <br />
        <textarea
          className="textarea2"
          type="text"
          name="description"
          value={ despesas.description }
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
          name="tag"
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
    const { despesas } = this.state;
    const { name, value } = event.target;
    this.setState({ despesas: { ...despesas, [name]: value } });
  }

  async changeValor(event) {
    const { despesas } = this.state;
    const { name, value } = event.target;
    const awaiit = await this.getAPI();
    // const promisse = Object.values(awaiit);
    //   this.setState({ despesas: { ...despesas,
    //     exchangeRates: promisse,
    //   } });
    // }
    // for (let i = 0; i < auxiliar.arrFinal.length; i += 1) {
    //   if (event.target.value === auxiliar.arrFinal[i]) {
    this.setState({ despesas: { ...despesas,
      [name]: value,
      exchangeRates: awaiit,
      // auxiliar.arrDeValores[i]
    } });
  }
  //   }
  // }

  acrescimoID() {
    const { despesas } = this.state;
    this.setState({ despesas: { ...despesas, id: despesas.id + 1 } },
      this.getCodesFromAPI);
  }

  resetValue() {
    const { despesas } = this.state;
    this.setState({ despesas: { ...despesas, value: '', description: '' } });
  }

  metodoPagamento() {
    return (
      <div>
        Forma de pagamento:
        <select
          data-testid="method-input"
          name="method"
          onChange={ (event) => this.change(event) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </div>);
  }

  render() {
    const { expenses, auxiliarr } = this.props;
    const { despesas, auxiliar } = this.state;
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
            this.acrescimoID();
            expenses(despesas);
            auxiliarr(auxiliar);
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
  auxiliarr: (auxiliar) => dispatch({ type: 'ADD_AUXILIAR', auxiliar }),

});

export default connect(mapStateToProps, mapDispatchToProps)(AddGastos);

AddGastos.propTypes = {
  expenses: PropTypes.func.isRequired,
  auxiliarr: PropTypes.func.isRequired,

};
