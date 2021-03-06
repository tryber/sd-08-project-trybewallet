import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRegister, GetAPIData } from '../actions';

const m = ['USD', 'CAD', 'EUR', 'GBP', 'ARS',
  'BTC', 'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
const methodInput = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tagInput = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class FormExpenses extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      method: '',
      tag: '',
      currency: '',
      exchangeRates: {},
    };
    this.changeForm = this.changeForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    const { fetchCurrent } = this.props;
    fetchCurrent();
    // .then(this.loading());
    // console.log(currency);
  }

  changeForm(e) {
    const { exchangeRates } = this.props;
    const typedValue = e.target.value;
    this.setState({
      [e.target.name]: typedValue,
      exchangeRates: exchangeRates[0],
    });
    // console.log(this.state);
  }

  // async submitForm() {
  //   const { id } = this.state;
  //   const { send } = this.props;
  //   const exchangeRates = await fetch('https://economia.awesomeapi.com.br/json/all')
  //     .then((response) => response.json());
  //   console.log(exchangeRates);
  //   send({ ...this.state, id: id + 1, exchangeRates });
  // }

  async submitForm() {
    const { id, value } = this.state;
    const { send, fetchCurrent, exchangeRates } = this.props;
    fetchCurrent();
    this.setState({
      exchangeRates: exchangeRates[0],
    });
    // const exchangeRates = await fetchCurrent();
    if (value) {
      this.setState({ id: id + 1 });
      console.log(this.state);
      send(this.state);
      // document.getElementById('input').reset();
      this.setState({ value: '',
        description: '',
        method: '',
        tag: '',
        currency: '' });
    }
  }
  // loading() {
  //   const { exchangeRates = [] } = this.props;
  //   if (!exchangeRates.length) {
  //     return <div>carregando...</div>;
  //   }
  //   // console.log(exchangeRates[0]);
  //   // const currency = Object.keys(exchangeRates[0]).reduce((result = [], key = {}) => {
  //   //   if (key.length <= NOT_MAGIC_TREE) {
  //   //     result.push(key);
  //   //   }
  //   //   return result;
  //   // }, []);
  //   // console.log(exchangeRates[0]);
  //   // console.log(currency);
  //   this.setState({ exchangeRates: exchangeRates[0] });
  // }

  render() {
    const { exchangeRates = [] } = this.props;
    const { value, description, currency, method, tag } = this.state;
    if (!exchangeRates.length) { return <div>carregando...</div>; }
    return (
      <form id="input">
        <input
          type="number"
          data-testid="value-input"
          value={ value }
          name="value"
          id="input"
          onChange={ this.changeForm }
        />
        <input
          type="text"
          data-testid="description-input"
          value={ description }
          name="description"
          onChange={ this.changeForm }
        />
        <select
          data-testid="currency-input"
          value={ currency }
          name="currency"
          onChange={ this.changeForm }
        >
          <option selected value="BRA">BRA</option>
          { m.map((e) => (<option key={ e } value={ e } data-testid={ e }>{e}</option>)) }
        </select>
        <select
          data-testid="method-input"
          value={ method }
          name="method"
          onChange={ this.changeForm }
        >
          { methodInput.map((e) => (<option key={ e } value={ e }>{e}</option>))}
        </select>
        <select
          data-testid="tag-input"
          value={ tag }
          name="tag"
          onChange={ this.changeForm }
        >
          { tagInput.map((e) => (<option key={ e } value={ e }>{e}</option>))}
        </select>
        <button type="button" onClick={ this.submitForm }>Adicionar despesa</button>
      </form>
    );
  }
}

FormExpenses.propTypes = {
  send: PropTypes.func.isRequired,
  fetchCurrent: PropTypes.func.isRequired,
  // currency: PropTypes.objectOf().isRequired,
  // expenses: PropTypes.objectOf().isRequired,
  exchangeRates: PropTypes.objectOf().isRequired,
};

function mapStateToProps(state) {
  return {
    currency: state.wallet.currency,
    expenses: state.wallet.expenses,
    exchangeRates: state.wallet.exchangeRates,
  };
}

const mapDispatchToProps = (dispatch) => ({
  send: (xablau) => dispatch(addRegister(xablau)),
  fetchCurrent: (xublau) => dispatch(GetAPIData(xublau)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormExpenses);
