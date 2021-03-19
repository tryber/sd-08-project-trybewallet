import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Edit extends Component {
  constructor(props) {
    super(props);

    const { expenses, idEdit } = this.props;
    const object = expenses.find((id, index) => expenses[index].id === idEdit);
    this.state = {
      currency: object.currency,
      description: object.description,
      method: object.method,
      tag: object.tag,
      value: object.value,
      id: object.id,
      exchangeRates: object.exchangeRates,
    };

    this.handleChange = this.handleChange.bind(this);
    this.inputCurrency = this.inputCurrency.bind(this);
    this.inputMethod = this.inputMethod.bind(this);
    this.inputCategory = this.inputCategory.bind(this);
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
      <div>
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ (event) => this.handleChange(event) }
        >
          {options.map((item) => (
            <option
              value={ item }
              key={ item }
              data-testid={ item }
            >
              {item}
            </option>))}
        </select>

      </div>
    );
  }

  inputMethod() {
    const { method } = this.props;
    const methodArray = [
      'Dinheiro', 'Cartão de crédito', 'Cartão de débito',
    ];
    return (
      <div>
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ (event) => this.handleChange(event) }
        >
          {methodArray.map((item) => (
            <option
              value={ item }
              key={ item }
              data-test-id={ item }
            >
              {item}
            </option>))}
        </select>
      </div>
    );
  }

  inputCategory() {
    const { tag } = this.state;
    const categoryArray = [
      'Alimentação',
      'Lazer',
      'Trabalho',
      'Transporte',
      'Saúde',
    ];
    return (
      <div>
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ (event) => this.handleChange(event) }
        >
          {categoryArray.map((categ) => (
            <option
              value={ categ }
              key={ categ }
              data-test-id={ categ }
            >
              {categ}
            </option>))}
        </select>
      </div>
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
        { this.inputMethod() }
        { this.inputCategory() }
        <button
          type="button"
          onClick={ () => saveEdit(objeto2) }
        >
          Editar despesa
        </button>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  idEdit: state.wallet.idEdit,
});

const mapDispatchToProps = (dispatch) => ({
  saveEdit: (newObject) => dispatch({ type: 'SAVE_EDIT', newObject }),
});

Edit.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  idEdit: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveEdit: PropTypes.arrayOf(PropTypes.object).isRequired,
  method: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
