import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../actions';

const metodos = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const categorias = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const ObjectToArray = (object) => {
  const array = Object.keys(object);
  array.splice(1, 1);
  return array;
};

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

  render() {
    const { email, fetchCurrency, currencies } = this.props;
    return (
      <main>
        <header>
          <span data-testid="email-field">{`Email: ${email}`}</span>
          <span data-testid="total-field">Despesa total: 0</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <section>
          <form>
            <label htmlFor="valor">
              Valor:
              <input type="text" data-testid="value-input" />
            </label>
            <label htmlFor="descricao">
              Descrição:
              <input type="text" data-testid="description-input" />
            </label>
            <label htmlFor="moeda">
              Moeda:
              <select data-testid="currency-input">
                {ObjectToArray(currencies).map((moeda) => (
                  <option
                    key={ moeda }
                    data-testid={ moeda }
                  >
                    {moeda}
                  </option>))}
              </select>
            </label>
            <label htmlFor="metodo-pagamento">
              Método de Pagamento:
              <select data-testid="method-input">
                {metodos.map((metodo) => <option key={ metodo }>{metodo}</option>)}
              </select>
            </label>
            <label htmlFor="categorias">
              Tag:
              <select data-testid="tag-input">
                {categorias.map((categ) => <option key={ categ }>{categ}</option>)}
              </select>
            </label>
            <button type="button" onClick={ fetchCurrency }>Adicionar despesa</button>
          </form>
        </section>
      </main>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  fetchCurrency: PropTypes.func.isRequired,
  currencies: PropTypes.shape(
    PropTypes.object.isRequired,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
