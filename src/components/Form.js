import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addExpense, fetchAPI as fetchAPIThunk } from '../actions';
import getAPIData from '../services/fetchAPI';

import { methodList, tagList } from './Lists';

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      list: [],
      update: false,
    };

    this.getInfos = this.getInfos.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const { fetchAPI } = this.props;
    await fetchAPI();
  }

  componentDidUpdate() {
    const { id, list, update } = this.state;
    const { currencies } = this.props;
    if (currencies.length !== list.length - 1) return this.setList();
    if (update) return this.setID(id + 1);
  }

  async setList() {
    const { currencies } = this.props;
    const listCur = currencies.map((item) => item.currency);
    this.setState({
      list: ['', ...listCur],
    });
  }

  setID(num) {
    this.setState({
      id: num,
      update: false,
    });
  }

  getInfos(name, value) {
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { id, value, description, currency, method, tag } = this.state;
    const { addExp } = this.props;

    const data = getAPIData()
      .then((response) => response);

    await addExp({
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: { ...await data } });
    this.setState({
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      list: [],
      update: true,
    });
  }

  render() {
    const { value, description, currency, method, tag, list } = this.state;
    return (
      <form>
        <p>Valor:</p>
        <input
          type="number"
          value={ value }
          onChange={ (e) => this.setState({ value: e.target.value }) }
          data-testid="value-input"
        />
        <p>Nome da despesa:</p>
        <input
          type="text"
          value={ description }
          onChange={ (e) => this.setState({ description: e.target.value }) }
          data-testid="description-input"
        />
        <p>Moeda:</p>
        <select
          value={ currency }
          onChange={ (e) => this.setState({ currency: e.target.value }) }
          data-testid="currency-input"
        >
          {list.map((it, idx) => <option key={ idx } data-testid={ it }>{it}</option>)}
        </select>
        <p>Forma de pagamento:</p>
        <select
          value={ method }
          onChange={ (e) => this.setState({ method: e.target.value }) }
          data-testid="method-input"
        >
          {methodList.map((item, index) => <option key={ index }>{item}</option>)}
        </select>
        <p>Tag:</p>
        <select
          value={ tag }
          onChange={ (e) => this.setState({ tag: e.target.value }) }
          data-testid="tag-input"
        >
          {tagList.map((item, index) => <option key={ index }>{item}</option>)}
        </select>
        <button type="button" onClick={ this.handleClick }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExp: (info) => dispatch(addExpense(info)),
  fetchAPI: () => dispatch(fetchAPIThunk()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  addExp: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape(
    {
      currency: PropTypes.string,
      currencyDetails: PropTypes.shape(
        {
          code: PropTypes.string,
          codein: PropTypes.string,
          name: PropTypes.string,
          high: PropTypes.string,
          low: PropTypes.string,
          varBid: PropTypes.string,
          pctChange: PropTypes.string,
          bid: PropTypes.string,
          ask: PropTypes.string,
          timestamp: PropTypes.string,
          create_date: PropTypes.string,
        },
      ),
    },
  )).isRequired,
  fetchAPI: PropTypes.func.isRequired,
};
