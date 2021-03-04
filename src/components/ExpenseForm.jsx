import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrencies from '../actions/wallet';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseValue: '',
      expenseDescription: '',
      expenseCurrency: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const { fetchCrr, currencyOpt } = this.props;
    await fetchCrr();
    console.log(currencyOpt);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { expenseValue, expenseDescription, expenseCurrency } = this.state;
    const { currencyOpt } = this.props;
    return (
      <form>
        <label htmlFor="expenseValue">
          <input
            type="number"
            name="expenseValue"
            value={ expenseValue }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <textarea
          type="number"
          name="expenseDescription"
          value={ expenseDescription }
          data-testid="description-input"
          onChange={ this.handleChange }
        />
        <label htmlFor="expenseCurrency">
          Moeda
          <select
            type="number"
            name="expenseCurrency"
            value={ expenseCurrency }
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {currencyOpt.map((currency, index) => (
              <option key={ index } value={ currency }>{currency}</option>))}
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyOpt: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCrr: () => dispatch(fetchCurrencies()),
});

ExpenseForm.propTypes = {
  fetchCrr: PropTypes.func.isRequired,
  currencyOpt: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
