import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRegister } from '../actions';

const moeda = ['USD', 'CAD', 'EUR', 'GBP', 'ARS',
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
      currency: '',
      method: '',
      tag: '',
    };
    this.changeForm = this.changeForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  changeForm(e) {
    const typedValue = e.target.value;
    this.setState({
      [e.target.name]: typedValue,
    });
  }

  submitForm() {
    const { id } = this.state;
    const { send } = this.props;
    this.setState({ id: id + 1 });
    send(this.state);
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form action="">
          <input
            placeholder="Dispesas"
            type="number"
            data-testid="value-input"
            value={ value }
            name="value"
            onChange={ this.changeForm }
          />
          <input
            placeholder="Descrisão"
            type="text"
            data-testid="description-input"
            value={ description }
            name="description"
            onChange={ this.changeForm }
          />
          <select data-testid="currency-input" value={ currency } name="currency" onChange={ this.changeForm }>
            <option selected value="BRA">BRA</option>
            { moeda.map(
              (element) => (<option key={ element } value={ element }>{element}</option>),
            )}
          </select>
          <select data-testid="method-input" value={ method } name="method" onChange={ this.changeForm }>
            { methodInput.map(
              (element) => (<option key={ element } value={ element }>{element}</option>),
            )}
          </select>
          <select data-testid="tag-input" value={ tag } name="tag" onChange={ this.changeForm }>
            { tagInput.map(
              (element) => (<option key={ element } value={ element }>{element}</option>),
            )}
          </select>
          <button type="button" onClick={ this.submitForm }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

FormExpenses.propTypes = {
  send: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  send: (xablau) => dispatch(addRegister(xablau)),
});

export default connect(null, mapDispatchToProps)(FormExpenses);
