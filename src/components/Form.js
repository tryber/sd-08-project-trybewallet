import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addExpense, fetchAPI as fetchAPIThunk } from '../actions';

import { methodList, tagList } from './Lists';

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      exp: 0,
      des: '',
      cur: '',
      met: '',
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
    const { currenciesInfo } = this.props;
    if (currenciesInfo.length !== list.length - 1) return this.setList();
    if (update) return this.setID(id + 1);
  }

  async setList() {
    const { currenciesInfo } = this.props;
    const listCur = currenciesInfo.map((item) => item.currency);
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

  handleClick() {
    const { id, exp, des, cur, met, tag } = this.state;
    const { addExp, currenciesInfo } = this.props;
    const finder = currenciesInfo
      .filter((item) => item.currency === cur).map((item) => item.currencyDetails);
    addExp({ id, exp, des, cur, met, tag, exchange: { ...finder[0] } });
    this.setState({ update: true });
  }

  render() {
    const { exp, des, cur, met, tag, list } = this.state;
    return (
      <form>
        <p>Valor:</p>
        <input
          type="number"
          value={ exp }
          onChange={ (e) => this.setState({ exp: e.target.value }) }
          data-testid="value-input"
        />
        <p>Descrição:</p>
        <input
          type="text"
          value={ des }
          onChange={ (e) => this.setState({ des: e.target.value }) }
          data-testid="description-input"
        />
        <p>Moeda:</p>
        <select
          value={ cur }
          onChange={ (e) => this.setState({ cur: e.target.value }) }
          data-testid="currency-input"
        >
          {list.map((it, idx) => <option key={ idx } data-testid={ it }>{it}</option>)}
        </select>
        <p>Forma de pagamento:</p>
        <select
          value={ met }
          onChange={ (e) => this.setState({ met: e.target.value }) }
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
  currenciesInfo: state.wallet.currencies,
  expensesInfo: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  addExp: PropTypes.func.isRequired,
  currenciesInfo: PropTypes.arrayOf(PropTypes.shape(
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
