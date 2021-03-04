import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, getData } from '../actions';
import Header from '../components/Header';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { GetCurrency } = this.props;
    GetCurrency();
  }

  inputExpense() {
    const { value } = this.state;
    return (
      <label htmlFor="expense">
        {' '}
        Gastos
        <input
          data-testid="value-input"
          type="number"
          id="expenses"
          value={ value }
          onChange={ (e) => this.setState({ value: e.target.value }) }
          placeholder="gastos"
        />
      </label>
    );
  }

  inputDescription() {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        {' '}
        Descrição da Despesa
        <input
          data-testid="description-input"
          value={ description }
          type="text"
          onChange={ (e) => this.setState({ description: e.target.value }) }
          placeholder="descricão"
        />
      </label>
    );
  }

  inputCurrency() {
    const { currency } = this.state;
    const { currencyData } = this.props;
    const object = Object.keys(currencyData);

    if (((object) !== undefined)) {
      return (

        <select
          id="currency"
          data-testid="currency-input"
          value={ currency }
          type="dropbox"
          onChange={ (e) => this.setState({ currency: e.target.value }) }
        >

          {Object.values(currencyData).filter((item) => item.name !== 'Dólar Turismo')
            .map((el) => (
              <option key={ el.code } data-testid={ el.code } value={ el.code }>
                {el.code}
              </option>
            ))}
        </select>
      );
    }
  }

  inputMethod() {
    '';

    const { method } = this.state;
    return (

      <select
        data-testid="method-input"
        value={ method }
        type="text"
        onChange={ (e) => this.setState({ method: e.target.value }) }
        placeholder="método"
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
    );
  }

  inputTag() {
    const { tag } = this.state;
    return (
      <select
        data-testid="tag-input"
        value={ tag }
        type="text"
        onChange={ (e) => this.setState({ tag: e.target.value }) }
        placeholder="tag"
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>

      </select>
    );
  }

  sumDealer() {
    const { expensesData } = this.props;
    expensesData.map((item) => {
      const { currency } = item;
      const somatotal = expensesData
        .reduce((acc, cur) => acc + cur.expense * cur.exchangeRates[currency].ask, 0);
      return somatotal;
    });
  }

  async buttonHandler() {
    const { Getexpense, GetCurrency, currencyData } = this.props;

    return (
      await GetCurrency(),
      this.setState({
        exchangeRates: currencyData,
      }),
      await Getexpense(this.state),
      this.setState({
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {},
      }),
      this.sumDealer()
    );
  }

  table() {
    const { expensesData } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expensesData.map((item) => (
              <tr key={ item.id }>
                <td>{item.description}</td>
                <td>{item.tag}</td>
                <td>{item.method}</td>
                <td>{item.value}</td>
                <td>{item.exchangeRates[item.currency].name}</td>
                <td>{parseFloat(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
                <td>
                  {parseFloat(item
                    .exchangeRates[item.currency].ask * item.value).toFixed(2)}
                </td>
                <td>Real</td>
                <td><button type="button">Excluir</button></td>
              </tr>))}
          </tbody>
        </table>
      </div>
    );
  }

  inputButton() {
    return (
      <button
        type="button"
        onClick={ () => this.buttonHandler() }
      >
        Adicionar despesa
      </button>
    );
  }

  render() {
    return (

      <div>
        <Header />
        <div className="form">
          <form>
            {this.inputExpense()}
            {this.inputDescription()}
            {this.inputMethod()}
            {this.inputCurrency()}
            {this.inputTag()}
            {this.inputButton()}
          </form>
        </div>
        <Table />

      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  GetCurrency: () => dispatch(getData()),
  Getexpense: (value) => dispatch(addExpense(value)),
});

const mapStateToProps = (state) => ({
  currencyData: state.wallet.currencies,
  expensesData: state.wallet.expenses,
});

Wallet.propTypes = {
  GetCurrency: PropTypes.func.isRequired,
  currencyData: PropTypes.func.isRequired,
  expensesData: PropTypes.func.isRequired,
  Getexpense: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
