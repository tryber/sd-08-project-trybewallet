import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './ExpenseTable.css';

// https://pt.stackoverflow.com/questions/456689/filtro-de-tabela-pelo-nome-em-react
// Auxílio do especialista Ícaro Harry (plantão dia 01/03/2021)
class ExpenseTable extends React.Component {
  render() {
    const { expenses } = this.props;
    const tableTitle = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado',
      'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
    ];
    return (
      <table className="expense-table">
        <thead>
          <tr>
          {tableTitle.map((title) => (
            <th className="title" key={ title }>
              {title}
            </th>
          ))}
          </tr>
        </thead>
        <tbody>
        {expenses.map((expense) => (
          <tr key={ expense.id }>
            <td className="data">{expense.description}</td>
            <td className="data">{expense.tag}</td>
            <td className="data">{expense.method}</td>
            <td className="data">{expense.value}</td>
            <td className="data">{expense.exchangeRates[expense.currency].name}</td>
            <td className="data">
              {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
            </td>
            <td className="data">
              {parseFloat(expense.value * expense.exchangeRates[expense.currency].ask)
                .toFixed(2)}
            </td>
            <td className="data">Real</td>
            <td className="data"> </td>
          </tr>
        ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(ExpenseTable);
