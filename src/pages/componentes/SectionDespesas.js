import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetApi, despesaAtual } from '../../actions';

class SectionDespesas extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      valor: '',
      descricao: '',
      moedaI: 'USD',
      metodo: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.metodoPag = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
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
    const { id, valor, descricao, moedaI, metodo, tag } = this.state;
    const { addDespesa } = this.props;
    return (
      fetch('https://economia.awesomeapi.com.br/json/all')
        .then((r) => r.json())
        .then((data) => {
          delete data.USDT;
          const expensive = {
            id,
            valor,
            descricao,
            moedaI,
            metodo,
            tag,
            exchangeRates: data,
          };
          addDespesa(expensive);
          this.setState({
            id: id + 1,
            valor: '',
            descricao: '',
          });
        })
    );
  }

  renderInputs(valor, descricao) {
    return (
      <>
        <h2>Cadastro de despasa</h2>
        <br />
        Valor Despesa
        <br />
        <input
          type="number"
          value={ valor }
          name="valor"
          data-testid="value-input"
          onChange={ this.onChange }
        />
        <br />
        <br />
        Descrição Despesa
        <br />
        <input
          type="text"
          value={ descricao }
          name="descricao"
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
    const { moedaI } = this.state;
    return (
      <>
        Moeda
        <br />
        <select
          value={ moedaI }
          name="moedaI"
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
    const { valor, descricao, metodo, tag } = this.state;
    return (
      <>
        { this.renderInputs(valor, descricao) }
        { this.renderMoeda() }
        <br />
        Método de Pagamento
        <br />
        <select
          value={ metodo }
          name="metodo"
          data-testid="method-input"
          onChange={ this.onChange }
        >
          { this.metodoPag.map((e) => (
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
