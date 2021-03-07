import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expenceData, fetchGetQuotation } from '../actions/index';
import Header from '../components/header';
import Table from '../components/table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.gererateID = this.gererateID.bind(this);
    this.zeraTudo = this.zeraTudo.bind(this);
    this.expenceSum = this.expenceSum.bind(this);
    // this.setExpences = this.setExpences.bind(this);
  }

  componentDidMount() {
    const { getQuotation } = this.props;
    getQuotation();
  }

  gererateID() {
    const { getQuotation } = this.props;
    getQuotation();
    const { id } = this.state;
    this.setState({
      id: id + 1,
    });
  }

  zeraTudo() {
    // const { value } = this.state;
    this.setState({
      value: 0,
    });
  }

  expenceSum() {
    const { currencyData } = this.props;
    console.log(currencyData.expenses);
    currencyData.expenses.map((cada) => console.log(cada.value));
  }

  handleChange(event) {
    const { currencyData } = this.props;
    this.setState({
      [event.target.name]: event.target.value,
      exchangeRates: currencyData.currencies,
    });
  }

  expenceForm() {
    const { value } = this.state;
    return (
      <>
        <label htmlFor="description">
          Despesa
          <input
            onChange={ this.handleChange }
            value={ value }
            name="value"
            data-testid="value-input"
            id="description"
          />
        </label>
        <label htmlFor="expence">
          Descrição da despesa
          <input
            onChange={ this.handleChange }
            name="description"
            data-testid="description-input"
            id="expence"
          />
        </label>
      </>
    );
  }

  currencies() {
    const { currencyData } = this.props;
    const currencieWhithoutUSDT = Object.keys(currencyData.currencies)
      .filter((currencie) => currencie !== 'USDT');
    return (
      <label htmlFor="currencie">
        Escolha a moeda
        <select
          onChange={ this.handleChange }
          name="currency"
          id="currencie"
          data-testid="currency-input"
        >
          { currencieWhithoutUSDT.map((currencie, index) => (
            <option
              data-testid={ currencie }
              key={ index }
              value={ currencie }
            >
              {currencie}
            </option>))}
        </select>
      </label>
    );
  }

  paymentMethod() {
    return (
      <label htmlFor="paymentMethod">
        Metodo de pagamento
        <select
          onChange={ this.handleChange }
          name="method"
          id="paymentMethod"
          data-testid="method-input"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  categoryExpence() {
    return (
      <label htmlFor="categoryExpence">
        Categoria da despesa
        <select
          onChange={ this.handleChange }
          name="tag"
          id="categoryExpence"
          data-testid="tag-input"
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

  render() {
    const { currencyData, setExpences } = this.props;

    return (
      <>
        <Header />
        {this.expenceForm()}
        { (currencyData.currencies) && this.currencies() }
        { this.paymentMethod()}
        { this.categoryExpence()}
        <button
          type="button"
          onClick={ () => {
            setExpences(this.state);
            this.gererateID();
            this.zeraTudo();
          } }
        >
          Adicionar despesa
        </button>

        <Table />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.user,
  currencyData: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  getQuotation: () => dispatch(fetchGetQuotation()),
  setExpences: (ops) => dispatch(expenceData(ops)),
});

Wallet.propTypes = {
  getQuotation: PropTypes.func.isRequired,
  setExpences: PropTypes.func.isRequired,
  currencyData: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
