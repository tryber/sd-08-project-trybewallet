import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { pegar, salvar } from '../actions';
import api from '../services';
import {
  gasto,
  pagamento,
  moeda,
  tabela,
} from '../store/consts';

const INITIAL_STATE = {
  value: '0',
  descricao: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  id: 0,
  total: '0',
};

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      ...INITIAL_STATE,
    };

    this.mudarCampos = this.mudarCampos.bind(this);
    this.sub = this.sub.bind(this);
    this.somaTotal = this.somaTotal.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  somaTotal() {
    const { expenses } = this.props;

    const precoTotal = expenses.reduce((total, each) => {
      const { value, currency, cambio } = each;
      const taxa = parseFloat(cambio[currency].ask);
      return total + parseFloat(value) * taxa;
    }, 0);

    return precoTotal.toFixed(2);
  }

  mudarCampos({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  async sub(e) {
    e.preventDefault();
    const { value, descricao, currency, method, tag, id } = this.state;
    const { salvarGasto } = this.props;
    const cambio = await api();

    const expense = {
      id,
      value,
      descricao,
      currency,
      method,
      tag,
      cambio,
    };

    salvarGasto(expense);

    this.setState({
      ...INITIAL_STATE,
      id: id + 1,
      total: this.somaTotal(),
    });
  }

  render() {
    const { value, descricao, currency, method, tag, total } = this.state;
    const { currencies, expenses, email } = this.props;
    const currenciesName = Object.keys(currencies || {});
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <div>
        <header>
          TrybeWallet
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{`R$ ${total}`}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          {gasto('Valor', 'number', 'value', value, this.mudarCampos)}
          {gasto(
            'Descrição',
            'text',
            'descricao',
            descricao,
            this.mudarCampos,
          )}
          <label htmlFor="currency-input">
            {'Moeda: '}
            {moeda(currenciesName, currency, this.mudarCampos)}
          </label>
          {pagamento(
            'Método de pagamento',
            'method',
            method,
            this.mudarCampos,
            methods,
          )}
          {pagamento('Tag', 'tag', tag, this.mudarCampos, tags)}
          <button type="submit" onClick={ this.sub }>
            Adicionar despesa
          </button>
        </form>
        {tabela(expenses)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies[0],
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(pegar()),
  salvarGasto: (expense) => dispatch(salvar(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object),
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf(PropTypes.object),
  salvarGasto: PropTypes.func.isRequired,
};

Wallet.defaultProps = {
  expenses: [],
  currencies: {},
};
