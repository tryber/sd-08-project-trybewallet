import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import ExpenseInput from './ExpenseInput';
import { fetchCurrencies, addExpense } from '../actions';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddExpense = this.handleAddExpense.bind(this);
  }

  async componentDidMount() {
    const { fetchCurrencies: fetchCurrenciesAction } = this.props;
    await fetchCurrenciesAction();
  }

  handleCurrency() {
    const { currencies } = this.props;
    return currencies.map((currency) => currency[0]);
  }

  async handleAddExpense(event) {
    event.preventDefault();
    event.persist();
    const {
      addExpense: addExpenseAction,
      fetchCurrencies: fetchCurrenciesAction,
    } = this.props;
    await fetchCurrenciesAction();
    addExpenseAction();
    event.target.parentNode.reset();
  }

  render() {
    return (
      <section>
        <form>
          <ExpenseInput name="value" label="Valor" />
          <ExpenseInput name="description" label="Descrição" />
          <ExpenseInput
            name="currency"
            type="select"
            label="Moeda"
            options={ this.handleCurrency() }
          />
          <ExpenseInput
            name="method"
            type="select"
            label="Método de Pagamento"
            options={ ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'] }
          />
          <ExpenseInput
            name="tag"
            type="select"
            label="Categoria"
            options={ ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'] }
          />
          <button
            type="submit"
            onClick={ this.handleAddExpense }
          >
            Adicionar despesa
          </button>
        </form>
      </section>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array]))
    .isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = {
  fetchCurrencies,
  addExpense,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
