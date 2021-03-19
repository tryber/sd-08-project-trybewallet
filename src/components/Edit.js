import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Form extends Component {
  constructor(props) {
    super(props);
    const { expenses, idEditing } = this.props;
    console.log(expenses);
    console.log(idEditing);
    const object = expenses.find(
      (id, index) => expenses[index].id === idEditing,
    );

    this.state = {
      currency: object.currency,
      description: object.description,
      method: object.method,
      tag: object.tag,
      value: object.value,
      id: object.id,
      exchangeRates: object.exchangeRates,
    };

    //   this.handleChange = this.handleChange.bind(this);
    //   this.handleClick = this.handleClick.bind(this);
    this.inputValue = this.inputValue.bind(this);
    this.inputMethod = this.inputMethod.bind(this);
    this.inputCurrency = this.inputCurrency.bind(this);
    this.inputCategory = this.inputCategory.bind(this);
    // }
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
        Moeda:
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ (event) => {
            this.handleChange(event);
          } }
        >
          {options.map((moeda) => (
            <option key={ moeda } value={ moeda } data-testid={ moeda }>
              {moeda}
            </option>
          ))}
        </select>
      </div>
    );
  }

  inputValue() {
    const { value, description } = this.state;
    return (
      <div>
        <input
          type="text"
          name="value"
          value={ value }
          data-testid="value-input"
          placeholder="Insira o valor"
          onChange={ (event) => this.handleChange(event) }
        />
        <textarea
          type="text"
          name="description"
          value={ description }
          data-testid="description-input"
          placeholder="Insira a descrição"
          onChange={ (event) => this.handleChange(event) }
        />
      </div>
    );
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  inputMethod() {
    const methodArray = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const { method } = this.state;
    return (
      <div>
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ (event) => this.handleChange(event) }
        >
          {methodArray.map((methodData) => (
            <option key={ methodData } value={ methodData } data-testid={ methodData }>
              {methodData}
            </option>
          ))}
        </select>
      </div>
    );
  }

  inputCategory() {
    const categoryArray = [
      'Alimentação',
      'Lazer',
      'Trabalho',
      'Transporte',
      'Saúde',
    ];
    const { tag } = this.state;
    return (
      <div>
        <select
          data-testid="tag-input"
          value={ tag }
          name="tag"
          onChange={ (event) => this.handleChange(event) }
        >
          {categoryArray.map((category) => (
            <option key={ category } value={ category } data-testid={ category }>
              {category}
            </option>
          ))}
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
      <div className="edit">
        {this.inputValue()}
        {this.inputCurrency()}
        {this.inputMethod()}
        {this.inputCategory()}
        <button type="button" onClick={ () => saveEdit(objeto2) }>
          Editar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  idEditing: state.wallet.idEditing,
});

const mapDispatchToProps = (dispatch) => ({
  saveEdit: (newObject) => dispatch({ type: 'SAVE_EDIT', newObject }),
});

Form.propTypes = {
  expensesCreator: PropTypes.shape({
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    exchangeRates: PropTypes.number.isRequired,
  }).isRequired,
  expenses: PropTypes.shape.isRequired,
  idEditing: PropTypes.bool.isRequired,
  saveEdit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
