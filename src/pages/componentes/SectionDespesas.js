import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetApi, despesaAtual } from '../../actions';

class SectionDespesas extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.methodPag = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    this.DespesaTags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    this.onChange = this.onChange.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
    this.renderInputs = this.renderInputs.bind(this);
    this.renderMoeda = this.renderMoeda.bind(this);
  }

  componentDidMount() {
    const { fetch } = this.props;
    fetch();
  }

  onChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleFetch() {
    const { id, value, description, currency, method, tag } = this.state;
    const { addDespesa } = this.props;
    return (
      fetch('https://economia.awesomeapi.com.br/json/all')
        .then((r) => r.json())
        .then((data) => {
          delete data.USDT;
          const expensive = {
            id,
            value,
            description,
            currency,
            method,
            tag,
            exchangeRates: data,
          };
          addDespesa(expensive);
          this.setState({
            id: id + 1,
            value: '',
            description: '',
          });
        })
    );
  }

  renderInputs(value, description) {
    return (
      <>
        <h2>Cadastro de despasa</h2>
        <br />
        value Despesa
        <br />
        <input
          type="number"
          value={ value }
          name="value"
          data-testid="value-input"
          onChange={ this.onChange }
        />
        <br />
        <br />
        Descrição Despesa
        <br />
        <input
          type="text"
          value={ description }
          name="description"
          data-testid="description-input"
          onChange={ this.onChange }
        />
        <br />
        <br />
      </>
    );
  }

  renderMoeda() {
    const { moeda } = this.props;
    const { currency } = this.state;
    return (
      <>
        Moeda
        <br />
        <select
          value={ currency }
          name="currency"
          data-testid="currency-input"
          onChange={ this.onChange }
        >
          {
            moeda.map((e) => (<option data-testid={ e } key={ e }>{ e }</option>))
          }
        </select>
        <br />
      </>
    );
  }

  render() {
    const { value, description, method, tag } = this.state;
    return (
      <>
        { this.renderInputs(value, description) }
        { this.renderMoeda() }
        <br />
        Método de Pagamento
        <br />
        <select
          value={ method }
          name="method"
          data-testid="method-input"
          onChange={ this.onChange }
        >
          { this.methodPag.map((e) => (
            <option key={ e } value={ e }>{ e }</option>
          ))}
        </select>
        <br />
        <br />
        Tag
        <br />
        <select
          value={ tag }
          name="tag"
          data-testid="tag-input"
          onChange={ this.onChange }
        >
          { this.DespesaTags.map((e) => (
            <option key={ e } value={ e }>{ e }</option>
          ))}
        </select>
        <br />
        <br />
        <button type="button" onClick={ this.handleFetch }>Adicionar despesa</button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  moeda: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(fetApi()),
  addDespesa: (e) => dispatch(despesaAtual(e)),
});

SectionDespesas.propTypes = {
  fetch: PropTypes.func.isRequired,
  moeda: PropTypes.arrayOf(PropTypes.string).isRequired,
  addDespesa: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionDespesas);
