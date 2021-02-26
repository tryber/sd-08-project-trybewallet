import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';
import { bindActionCreators } from 'redux';
import getAPI from '../services/index';
import { wallet } from '../actions';

const METODOS_PAGAMENTO = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const TIPO_DESPESA = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class Wallet extends Component {
  constructor() {
    super();
    this.state = {
      formasDePagamento: METODOS_PAGAMENTO,
      tipoDespesa: TIPO_DESPESA,
      moedas: [],
      valor: '',
      descricao: '',
      moeda: '',
      metodoPG: '',
      despesa: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    getAPI().then((data) => {
      delete data.USDT; // visto no projeto do colega Paulo Simões 26/02/2021
      this.setState({
        moedas: Object.values(data),
      });
    });
  }

  componentDidUpdate() {
    this.gastosTotais();
  }

  gastosTotais() {
    const { gastos } = this.props;
    console.log(gastos);
  }

  handleClick() {
    const { valor, descricao, moeda, metodoPG, despesa } = this.state;
    const expenses = { valor, descricao, moeda, metodoPG, despesa };
    const { addFetchDespesa } = this.props;
    addFetchDespesa(expenses);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState((state) => ({
      ...state, [name]: value,
    }));
  }

  renderSelectInputs() {
    const { moedas, formasDePagamento, tipoDespesa,
      moeda, metodoPG, despesa } = this.state;
    return (
      <>
        <select
          onChange={ this.handleChange }
          value={ moeda }
          name="moeda"
          data-testid="currency-input"
        >
          {moedas.map(({ name, code }) => (
            <option key={ name } data-testid={ code } value={ code }>{name}</option>
          ))}
        </select>
        <select
          onChange={ this.handleChange }
          value={ metodoPG }
          name="metodoPG"
          data-testid="method-input"
        >
          {formasDePagamento.map((payment) => (
            <option key={ payment } value={ payment }>{payment}</option>
          ))}
        </select>
        <select
          onChange={ this.handleChange }
          value={ despesa }
          name="despesa"
          data-testid="tag-input"
        >
          {tipoDespesa.map((value) => (
            <option key={ value } value={ value }>{value}</option>
          ))}
        </select>
      </>
    );
  }

  render() {
    const { userEmail } = this.props;
    const { descricao, valor } = this.state;
    return (
      <>
        <header className="Wallet-header">
          <span data-testid="email-field">{userEmail}</span>
          <span data-testid="total-field">
            {}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <main>
          <input
            onChange={ this.handleChange }
            value={ valor }
            name="valor"
            data-testid="value-input"
            type="number"
          />
          <input
            onChange={ this.handleChange }
            value={ descricao }
            name="descricao"
            data-testid="description-input"
            type="text"
          />
          {this.renderSelectInputs()}
          <button onClick={ this.handleClick } type="button">Adicionar despesa</button>
        </main>
      </>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(wallet, dispatch);

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  gastos: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
