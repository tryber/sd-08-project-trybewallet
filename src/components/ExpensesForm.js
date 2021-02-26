import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCurrencies as fetchCurrenciesAction } from '../actions';

class ExpensesForm extends React.Component {
  constructor() {
    super();

    this.renderCurrencieOptions = this.renderCurrencieOptions.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  renderCurrencieOptions() {
    const { currencies } = this.props;
    return (
      <select data-testid="currency-input" id="currency-input">
        { Object.values(currencies[0]).map((currency) => (
          currency.name !== 'Dólar Comercial')
          && (
            <option
              data-testid={ currency.code }
              key={ currency.code }
              value={ currency.ask }
            >
              { currency.code }
            </option>))}
      </select>
    );
  }

  render() {
    const { loading } = this.props;

    return (
      <form>
        <label htmlFor="value-input">
          Despesas
          <input data-testid="value-input" id="value-input" type="text" />
        </label>

        <label htmlFor="description-input">
          Descrição
          <input data-testid="description-input" id="description-input" type="text" />
        </label>

        <label htmlFor="currency-input">
          Moeda
          { !loading && this.renderCurrencieOptions() }
        </label>

        <label htmlFor="method-input">
          Método de pagamento
          <select data-testid="method-input" id="method-input">
            <option value="money">Dinheiro</option>
            <option value="credit">Cartão de crédito</option>
            <option value="debit">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Categoria Despesa
          <select data-testid="tag-input" id="tag-input">
            <option value="leasure">Lazer</option>
            <option value="meal">Alimentação</option>
            <option value="work">Trabalho</option>
            <option value="tranportation">Transporte</option>
            <option value="health">Saúde</option>
          </select>
        </label>

        <button type="button">Adicionar Despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.wallet.isFetching,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
});

ExpensesForm.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
