import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { expenseAdd } from '../actions/index';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: {},
    };
  }

  async componentDidMount() {
    await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((resp) => resp.json())
      .then((data) => this.setState({
        exchangeRates: data,
      }));
  }

  handleChangeCampo(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  isHeader(email, soma) {
    return (
      <>
        <header>
          <h2>Wallet</h2>
          <p data-testid="email-field">{email}</p>
        </header>

        <section>
          <h3>Lista de Gastos</h3>
          <p data-testid="total-field">{soma}</p>
        </section>
      </>
    );
  }

  selectPag(newMoedas, handleFunc) {
    const { value, description, currency, method } = this.state;
    return (
      <>
        <p data-testid="header-currency-field">BRL</p>
        <input
          onChange={ handleFunc }
          value={ value }
          name="value"
          data-testid="value-input"
        />
        <input
          onChange={ handleFunc }
          placeholder="Descrição"
          name="description"
          value={ description }
          data-testid="description-input"
        />
        <select
          onChange={ handleFunc }
          name="currency"
          value={ currency }
          data-testid="currency-input"
        >
          <option>Selecione a Moeda</option>
          {newMoedas.map((moeda, index) => (
            <option data-testid={ moeda.code } key={ index }>{moeda.code}</option>))}
        </select>
        <select
          onChange={ handleFunc }
          name="method"
          value={ method }
          data-testid="method-input"
        >
          <option>Metodo de Pagamento</option>
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select onChange={ handleFunc } name="tag" data-testid="tag-input">
          <option>Categorias</option>
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </>
    );
  }

  render() {
    const { email, expenses, expenseFuncAdd } = this.props;
    const { exchangeRates, value, description,
      currency, method, tag } = this.state;
    const newMoedas = Object.values(exchangeRates)
      .filter((element, index, self) => index === self.findIndex((t) => (
        t.code === element.code
      )));
    let soma = 0;
    expenses.forEach((element) => {
      const valorMoeda = newMoedas.filter((el) => el.code === element.currency);
      // console.log(valorMoeda);
      soma += (parseFloat(element.value) * parseFloat(valorMoeda[0].ask));
    });
    const handleFunc = this.handleChangeCampo.bind(this);
    // console.log(newMoedas);
    return (
      <div className="wallet-main">
        {this.isHeader(email, soma)}
        {this.selectPag(newMoedas, handleFunc)}
        <button
          onClick={ () => {
            expenseFuncAdd({
              id: !expenses.length ? 0 : expenses.length,
              value,
              description,
              currency,
              method,
              tag,
              exchangeRates,
            });
            this.setState({
              value: '',
              description: '',
              currency: '',
              method: '',
              tag: '',
            });
          } }
          type="button"
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ expenseFuncAdd: expenseAdd }, dispatch)
);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  expenseFuncAdd: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
