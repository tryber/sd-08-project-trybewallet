import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { /* EditDelSpend, */ AddSpend } from './Index';

class SpendTable extends React.Component {
  constructor() {
    super();

    this.renderButtonEditDel = this.renderButtonEditDel.bind(this);
  }

  renderExpenses() {
    const { expenses } = this.props;
    if (expenses.length === 0) {
      return (
        <tr>
          <td>Nenhuma despesa adicionada</td>
        </tr>
      );
    }
    return expenses.map((expense, index) => {
      const {
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates } = expense;
      const expenseValue = parseFloat(value);
      const currencyValue = parseFloat(exchangeRates[currency].ask);
      return (
        <tr key={ index }>
          <td>{ id }</td>
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{ value }</td>
          <td>{ exchangeRates[currency].name }</td>
          <td>{currencyValue.toFixed(2)}</td>
          <td>{(expenseValue * currencyValue).toFixed(2)}</td>
          <td>Real</td>
        </tr>
      );
    });
  }

  renderButtonEditDel() {
    return (
      <form>
        <button
          type="button"
        >
          Editar/Excluir
        </button>
      </form>
    );
  }

  render() {
    return (
      <section>
        <AddSpend />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { this.renderExpenses() }
          </tbody>
        </table>
        {/* <EditDelSpend /> */}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(SpendTable);

SpendTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
};

SpendTable.defaultProps = {
  expenses: [],
};
