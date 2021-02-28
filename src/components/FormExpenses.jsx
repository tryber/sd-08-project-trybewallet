import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRegister, GetAPIData } from '../actions';

const m = ['USD', 'CAD', 'EUR', 'GBP', 'ARS',
  'BTC', 'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
const methodInput = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tagInput = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const TWO_SECONDS = 2000;

class FormExpenses extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: '',
    };
    this.changeForm = this.changeForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    const { fetchCurrent } = this.props;
    this.timer = setInterval(() => {
      fetchCurrent();
    }, TWO_SECONDS);
  }

  changeForm(e) {
    const typedValue = e.target.value;
    this.setState({
      [e.target.name]: typedValue,
    });
  }

  submitForm() {
    const { id } = this.state;
    const { send, fetchCurrent } = this.props;
    fetchCurrent();
    this.setState({ id: id + 1 });
    send(this.state);
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <form action="">
        <input
          type="number"
          data-testid="value-input"
          value={ value }
          name="value"
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
          {
            m.map((e) => (<option key={ e } value={ e } data-testid={ e }>{e}</option>))
          }
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
};

const mapDispatchToProps = (dispatch) => ({
  send: (xablau) => dispatch(addRegister(xablau)),
  fetchCurrent: () => dispatch(GetAPIData()),
});

export default connect(null, mapDispatchToProps)(FormExpenses);
