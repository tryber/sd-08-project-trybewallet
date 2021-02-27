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
      valor: '',
      descricao: '',
      moeda: 'USD',
      metodoPg: '',
      categoria: '',
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
    const { total } = this.props;
    const { email } = this.props;
    return (
      <header>
        <div>TrybeWallet</div>
        <span>
          Email do Usuário:
          <span data-testid="email-field">
            { email }
          </span>
        </span>
        <span data-testid="total-field">{ total }</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }

  valueInput() {
    const { valor } = this.state;
    return (
      <label htmlFor="value-input">
        Valor:
        <input
          value={ valor }
          onChange={ (e) => this.setState({ valor: e.target.value }) }
          name="value-input"
          type="number"
          data-testid="value-input"
        />
      </label>
    );
  }

  descEMoedaInput() {
    const { currencies } = this.props;
    const { descricao, moeda } = this.state;
    return (
      <>
        <label htmlFor="description-input">
          Descrição da despesa:
          <input
            name="description-input"
            type="text"
            data-testid="description-input"
            value={ descricao }
            onChange={ (e) => this.setState({ descricao: e.target.value }) }
          />
        </label>
        Moeda:
        <select
          value={ moeda }
          onChange={ (e) => this.setState({ moeda: e.target.value }) }
        >
          { currencies.map((currency, index) => (
            <option key={ index } value={ currency } data-testid={ currency }>
              { currency }
            </option>))}
        </select>
      </>
    );
  }

  handleChange() {
    const { fetchToRegister } = this.props;
    fetchToRegister(this.state);
    this.setState({
      valor: '',
      descricao: '',
      moeda: 'USD',
      metodoPg: '',
      categoria: '',
    });
  }

  forms() {
    const { isFetching } = this.props;
    const { metodoPg, categoria } = this.state;
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
                value={ metodoPg }
                onChange={ (e) => this.setState({ metodoPg: e.target.value }) }
              >
                {metPg.map((mpg, ind) => (
                  <option key={ ind } value={ mpg }>
                    { mpg }
                  </option>))}
              </select>
              Categoria (tag):
              <select
                data-testid="tag-input"
                value={ categoria }
                onChange={ (e) => this.setState({ categoria: e.target.value }) }
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
