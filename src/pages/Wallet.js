import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies as fetchCurrenciesAction,
  fetchToRegister as fetchToRegisterAction } from '../actions';

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
    const { email, total, isFetching } = this.props;
    return (
      <header>
        <div>TrybeWallet</div>
        <span>
          Email do Usuário:
          <span data-testid="email-field">
            { email }
          </span>
        </span>
        <span data-testid="total-field">
          { isFetching ? 0 : total }
        </span>
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
          Descrição da despesa:
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

  handleChange() {
    const { fetchToRegister } = this.props;
    fetchToRegister(this.state);
    this.setState({
      value: '',
      currency: 'USD',
      method: '',
      tag: '',
      description: '',
    });
  }

  forms() {
    const { isFetching } = this.props;
    const { method, description } = this.state;
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
                value={ description }
                onChange={ (e) => this.setState({ description: e.target.value }) }
              >
                {tags.map((tag, ind) => (
                  <option key={ ind } value={ tag }>
                    { tag }
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
      </body>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.func.isRequired,
  currencies: PropTypes.func.isRequired,
  total: PropTypes.func.isRequired,
  isFetching: PropTypes.func.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  fetchToRegister: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
  fetchToRegister: (state) => dispatch(fetchToRegisterAction(state)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
