import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCurrency as fetchCurrencyAction,
} from '../actions';
import Table from '../components/Table';
import { payMethods, expenditures } from '../const';
import './Wallet.css';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      exchange: 'BRL',
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
    this.renderHeader = this.renderHeader.bind(this);
    this.renderInputs = this.renderInputs.bind(this);
    this.renderSelectCurrencies = this.renderSelectCurrencies.bind(this);
    this.renderSelectMethod = this.renderSelectMethod.bind(this);
    this.renderSelectExpenditures = this.renderSelectExpenditures.bind(this);
    this.initialState = this.initialState.bind(this);
  }

  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
    this.initialState();
  }

  initialState() {
    const { exchange } = this.state;
    this.setState({
      value: 0,
      description: '',
      currency: exchange,
      method: payMethods[0],
      tag: expenditures[0],
    });
  }

  renderHeader() {
    const { exchange } = this.state;
    const { email, total = 0 } = this.props;
    return (
      <header className="header">
        <h3 className="title">TrybeWallet</h3>
        <hr className="title" />
        <section className="wallet-content">
          <div data-testid="email-field">
            Usuário:
            {' '}
            { email }
          </div>
          <div className="total-header">
            <div className="label-total">Despesas totais:</div>
            <div
              className="total-field"
              data-testid="total-field"
            >
              { total }
            </div>
            <div
              className="exchange-field"
              data-testid="header-currency-field"
            >
              { exchange }
            </div>
          </div>
        </section>
      </header>
    );
  }

  renderInputs() {
    const { value, description } = this.state;
    return (
      <>
        <input
          data-testid="value-input"
          onChange={ (e) => {
            this.setState({ value: e.target.value });
          } }
          placeholder="Valor"
          value={ value }
          type="text"
        />
        <input
          data-testid="description-input"
          onChange={ (e) => {
            this.setState({ description: e.target.value });
          } }
          placeholder="Descrição"
          value={ description }
          type="text"
        />
      </>
    );
  }

  renderSelectCurrencies() {
    const { currencies } = this.props;
    const { currency, exchange } = this.state;
    return (
      <select
        data-testid="currency-input"
        id="currencies"
        onChange={ (e) => {
          this.setState({ currency: e.target.value });
        } }
        name="currency"
        value={ currency }
      >
        {currencies
          && [exchange, ...currencies].map((curr, index) => (
            <option
              data-testid={ curr }
              key={ index }
              value={ curr }
            >
              {curr}
            </option>
          ))}
      </select>
    );
  }

  renderSelectMethod() {
    const { method } = this.state;
    return (
      <select
        data-testid="method-input"
        id="payMethods"
        onChange={ (e) => {
          this.setState({ method: e.target.value });
        } }
        name="payMethod"
        value={ method }
      >
        {payMethods
          && payMethods.map((payMethod, index) => (
            <option
              key={ index }
              value={ payMethod }
            >
              {payMethod}
            </option>
          ))}
      </select>
    );
  }

  renderSelectExpenditures() {
    const { tag } = this.state;
    return (
      <select
        data-testid="tag-input"
        id="tags"
        onChange={ (e) => {
          this.setState({ tag: e.target.value });
        } }
        name="tag"
        value={ tag }
      >
        {expenditures
          && expenditures.map((expenditure, index) => (
            <option
              key={ index }
              value={ expenditure }
            >
              {expenditure}
            </option>
          ))}
      </select>
    );
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { fetchCurrency } = this.props;
    return (
      <>
        <this.renderHeader />
        <main>
          <h4 className="title">Adicione despesa</h4>
          <section>
            <this.renderInputs />
            <this.renderSelectCurrencies />
            <this.renderSelectMethod />
            <this.renderSelectExpenditures />
          </section>
          <button
            onClick={ () => {
              fetchCurrency(
                { value, description, currency, method, tag },
                true,
              );
              this.initialState();
            } }
            type="button"
          >
            Adicionar despesa
          </button>
          <hr className="title" />
        </main>
        <Table />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  values: state.wallet.expenses,
  total: state.wallet.total,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: (expenses, saving) => dispatch(
    fetchCurrencyAction(expenses, saving),
  ),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  fetchCurrency: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  total: PropTypes.number,
};

Wallet.defaultProps = {
  total: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
