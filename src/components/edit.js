import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Edit extends Component {
  constructor(props) {
    super(props);

    const { expenses, idEdit } = this.props;
    const object = expenses
      .find((id, index) => expenses[index].id === idEdit);

    this.state = {
      currency: object.currency,
      description: object.description,
      method: object.method,
      tag: object.tag,
      value: object.value,
      id: object.id,
      exchangeRates: object.exchangeRates,
    };

    this.inputValues = this.inputValues.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.inputCurrency = this.inputCurrency.bind(this);
    this.inputPayment = this.inputPayment.bind(this);
    this.inputExpenseCategory = this.inputExpenseCategory.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  inputValues() {
    const { value, description } = this.state;
    return (
      <div>
        <input
          type="text"
          name="value"
          value={ value }
          data-testid="value-input"
          onChange={ (event) => this.handleChange(event) }
        />
        <textarea
          type="text"
          name="description"
          value={ description }
          data-testid="description-input"
          onChange={ (event) => this.handleChange(event) }
        />
      </div>
    );
  }

  inputCurrency() {
    const { currency } = this.state;
    const options = [
      'USD',
      'CAD',
      'EUR',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
    ];
    return (
      <select
        data-testid="currency-input"
        name="currency"
        value={ currency }
        onChange={ (event) => this.handleChange(event) }
      >
        {options.map((cur) => (
          <option
            key={ cur }
            value={ cur }
            data-testid={ cur }
          >
            { cur }
          </option>
        ))}
      </select>
    );
  }

  inputPayment() {
    const { method } = this.state;
    const paymentMethods = [
      'Dinheiro', 'Cartão de crédito', 'Cartão de débito',
    ];
    return (
      <select
        data-testid="method-input"
        name="method"
        value={ method }
        onChange={ (event) => this.handleChange(event) }
      >
        {paymentMethods.map((item) => (
          <option
            key={ item }
            value={ item }
          >
            { item }
          </option>
        ))}
      </select>
    );
  }

  inputExpenseCategory() {
    const { tag } = this.state;
    const categories = [
      'Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde',
    ];
    return (
      <select
        data-testid="tag-input"
        name="tag"
        value={ tag }
        onChange={ (event) => this.handleChange(event) }
      >
        {categories.map((catag) => (
          <option
            key={ catag }
            value={ catag }
          >
            { catag }
          </option>
        ))}
      </select>
    );
  }

  render() {
    const { saveEdit } = this.props;
    const {
      currency,
      description,
      method,
      tag,
      value,
      id,
      exchangeRates,
    } = this.state;
    const objeto2 = {
      currency,
      description,
      method,
      tag,
      value,
      id,
      exchangeRates,
    };
    return (
      <div>
        { this.inputValues() }
        { this.inputCurrency() }
        { this.inputPayment() }
        { this.inputExpenseCategory() }
        <button
          type="button"
          onClick={ () => saveEdit(objeto2) }
        >
          Editar despesa
        </button>
      </div>
    );
  }
}

Edit.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  idEdit: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveEdit: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  idEdit: state.wallet.idEdit,
});

const mapDispatchToProps = (dispatch) => ({
  saveEdit: (newObject) => dispatch({ type: 'SAVE_EDIT', newObject }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
