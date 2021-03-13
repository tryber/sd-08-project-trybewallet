import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenseWithRates, getRequest } from '../actions/index';

const alimentação = 'Alimentação';

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentação,
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCurrency = this.handleCurrency.bind(this);
    this.handleMethods = this.handleMethods.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.handlAddExpenses = this.handlAddExpenses.bind(this);
  }

  componentDidMount() {
    const { getFetch } = this.props;
    getFetch();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleInputs() {
    const { value, description } = this.state;
    return (
      <div>
        <label htmlFor="valor">
          Valor despesa:
          <input
            onChange={ this.handleChange }
            data-testid="value-input"
            name="value"
            type="number"
            value={ value }
          />
        </label>
        <label htmlFor="descrição">
          Descrição despesa:
          <input
            onChange={ this.handleChange }
            data-testid="description-input"
            name="description"
            type="text"
            value={ description }
          />
        </label>
      </div>
    );
  }

  handleCurrency() {
    const { currency } = this.state;
    const { currencies } = this.props;
    if (currencies.length > 0) {
      return (
        <select
          name="currency"
          onChange={ this.handleChange }
          value={ currency }
          data-testid="currency-input"
        >
          {currencies
            .map((code) => <option data-testid={ code } key={ code }>{code}</option>)}
        </select>
      );
    }
  }

  handleMethods() {
    const payMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const { method } = this.state;

    return (
      <select
        onChange={ this.handleChange }
        name="method"
        value={ method }
        data-testid="method-input"
      >
        {payMethods
          .map((methods) => (
            <option
              key={ methods }
            >
              {methods}
            </option>))}
      </select>
    );
  }

  handleTags() {
    const tages = [alimentação, 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { tag } = this.state;

    return (
      <select
        name="tag"
        onChange={ this.handleChange }
        value={ tag }
        data-testid="tag-input"
      >
        {tages
          .map((tags) => (
            <option
              key={ tags }
            >
              {tags}
            </option>))}
      </select>
    );
  }

  handlAddExpenses() {
    const { addExpenses } = this.props;
    addExpenses(this.state);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentação,
    });
  }

  render() {
    return (
      <div>
        {this.handleInputs()}
        {this.handleCurrency()}
        {this.handleMethods()}
        {this.handleTags()}
        <button
          type="button"
          onClick={ this.handlAddExpenses }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenses: (expenses) => dispatch((addExpenseWithRates(expenses))),
  getFetch: () => dispatch(getRequest()),

});

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpenses: PropTypes.func.isRequired,
  getFetch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
