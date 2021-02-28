import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies as fetchCurrenciesAction,
  fetchToRegister as fetchToRegisterAction } from '../actions';
import Table from './Table';

const tags = ['', 'Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const metPg = ['', 'Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      currency: 'USD',
      method: '',
      tag: '',
      description: '',
      total: 0,
    };

    this.header = this.header.bind(this);
    this.forms = this.forms.bind(this);
    this.valueInput = this.valueInput.bind(this);
    this.descEMoedaInput = this.descEMoedaInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  header() {
    const { email } = this.props;
    const { total } = this.state;
    return (
      <header>
        <div>TrybeWallet</div>
        <span>
          Email do Usuário:
          <span data-testid="email-field">
            { email }
          </span>
        </span>
        <span data-testid="total-field">{ total.toFixed(2) }</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }

  valueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="value-input">
        Valor:
        <input
          value={ value }
          onChange={ (e) => this.setState({ value: e.target.value }) }
          name="value-input"
          type="number"
          data-testid="value-input"
        />
      </label>
    );
  }

  descEMoedaInput() {
    const { currencies } = this.props;
    const { description, currency } = this.state;
    return (
      <>
        <label htmlFor="description-input">
          Com o que foi gasto?:
          <input
            name="description-input"
            type="text"
            data-testid="description-input"
            value={ description }
            onChange={ (e) => this.setState({ description: e.target.value }) }
          />
        </label>
        Moeda:
        <select
          value={ currency }
          onChange={ (e) => this.setState({ currency: e.target.value }) }
          data-testid="currency-input"
        >
          { currencies.map((moeda, index) => (
            <option key={ index } value={ moeda } data-testid={ moeda }>
              { moeda }
            </option>))}
        </select>
      </>
    );
  }

  async handleChange() {
    const { fetchToRegister } = this.props;
    await fetchToRegister(this.state);
    const { value, currency, total } = this.state;
    const { expenses } = this.props;

    const soma = parseFloat(value)
      * parseFloat(expenses[0].exchangeRates[currency].ask)
        + total;

    this.setState({
      value: '',
      currency: 'USD',
      method: '',
      tag: '',
      description: '',
      total: soma,
    });
  }

  forms() {
    const { isFetching } = this.props;
    const { method, tag } = this.state;
    return (
      isFetching ? <p> loading </p>
        : (
          <section>
            <form>
              { this.valueInput() }
              { this.descEMoedaInput() }
              Método de pagamento:
              <select
                data-testid="method-input"
                value={ method }
                onChange={ (e) => this.setState({ method: e.target.value }) }
              >
                {metPg.map((mpg, ind) => (
                  <option key={ ind } value={ mpg }>
                    { mpg }
                  </option>))}
              </select>
              Categoria (tag):
              <select
                data-testid="tag-input"
                value={ tag }
                onChange={ (e) => this.setState({ tag: e.target.value }) }
              >
                {tags.map((categ, ind) => (
                  <option key={ ind } value={ categ }>
                    { categ }
                  </option>))}
              </select>
              <button type="button" onClick={ this.handleChange }>
                Adicionar despesa
              </button>
            </form>
          </section>
        )
    );
  }

  render() {
    return (
      <body>
        { this.header() }
        { this.forms() }
        <Table />
      </body>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.func.isRequired,
  currencies: PropTypes.func.isRequired,
  isFetching: PropTypes.func.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  expenses: PropTypes.func.isRequired,
  fetchToRegister: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
  fetchToRegister: (state) => dispatch(fetchToRegisterAction(state)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
