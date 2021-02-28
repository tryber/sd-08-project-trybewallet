import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './ExpenseTable.css';

class ExpenseTable extends React.Component {
  render() {
    const { tableData } = this.props;
    const tableHead = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado',
      'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
    ];
    return (
      <table className="expense-table">
        <thead>
          {tableHead.map((tableKey) => (
            <th className="title" key={ tableKey }>
              {tableKey}
            </th>
          ))}
        </thead>
        {tableData.map((expense) => (
          <tbody key={ expense.id }>
            <td className="data">{expense.description}</td>
            <td className="data">{expense.tag}</td>
            <td className="data">{expense.method}</td>
            <td className="data">{expense.value}</td>
            <td className="data">
              {expense.exchangeRates[expense.currency].name}
            </td>
            <td className="data">
              {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
            </td>
            <td className="data">
              {this.toConvertValue(
                expense.value,
                expense.exchangeRates[expense.currency].ask,
              ).toFixed(2)}
            </td>
            <td className="data">Real</td>
            <td className="data"> </td>
          </tbody>
        ))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  tableData: state.wallet.expenses,
});

ExpenseTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, null)(ExpenseTable);
