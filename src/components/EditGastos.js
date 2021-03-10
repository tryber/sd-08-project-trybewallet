import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class EditGastos extends Component {
  constructor(props) {
    super(props);
    const { expenses, IDediting } = this.props;
    const obj = expenses.find((id, index) => expenses[index].id === IDediting);
    this.state = {
      despesas: {
        id: obj.id,
        value: obj.value,
        description: obj.description,
        currency: obj.currency,
        method: obj.method,
        tag: obj.tag,
        exchangeRates: obj.exchangeRates,
      },
    };

    this.inputsGastos = this.inputsGastos.bind(this);
    this.categoriaDespesa = this.categoriaDespesa.bind(this);
    this.tipoDeMoeda = this.tipoDeMoeda.bind(this);
    this.metodoPagamento = this.metodoPagamento.bind(this);
    this.change = this.change.bind(this);
  }

  tipoDeMoeda() {
    const { despesas } = this.state;
    const options = ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC',
      'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
    return (
      <div>
        Moeda:
        <select
          data-testid="currency-input"
          name="currency"
          value={ despesas.currency }
          onChange={ (event) => {
            this.change(event);
          } }
        >
          {options.map((moeda) => (
            <option key={ moeda } value={ moeda } data-testid={ moeda }>
              {moeda}
            </option>
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
          placeholder="faça aqui a sua edição"
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
    const { despesas } = this.state;
    return (
      <div>
        Tipo de despesa:
        <select
          value={ despesas.tag }
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

  metodoPagamento() {
    const { despesas } = this.state;
    return (
      <div>
        Forma de pagamento:
        <select
          value={ despesas.method }
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
    const { saveEdit } = this.props;
    const { despesas } = this.state;
    return (
      <div className="editForm">
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
            saveEdit(despesas);
          } }
        >
          Editar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  IDediting: state.wallet.IDediting,
  auxiliar: state.wallet.auxiliar,
});

const mapDispatchToProps = (dispatch) => ({
  saveEdit: (newObj) => dispatch({ type: 'SAVE_EDIT', newObj }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditGastos);

EditGastos.propTypes = {
  expenses: PropTypes.func.isRequired,
  IDediting: PropTypes.number.isRequired,
  saveEdit: PropTypes.func.isRequired,
};
