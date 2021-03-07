import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  convert(value, aks) {
    const convert = Number(value) * Number(aks);
    return convert.toFixed(2);
  }

  cell() {
    const { expenses } = this.props;
    return (
      expenses.map((expense, index) => (
        <tr key={ index }>
          <td>{ expense.description }</td>
          <td>{expense.tag}</td>
          <td>{expense.method}</td>
          <td>{expense.value}</td>
          <td>{expense.exchangeRates[expense.currency].name}</td>
          <td>{parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
          <td>
            {this.convert(expense.value,
              expense.exchangeRates[expense.currency].ask)}
          </td>
          <td>Real</td>
          <td>A/E</td>
        </tr>
      ))
    );
  }

  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <table>
        <tr>
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
        {this.cell()}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.user,
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.node.isRequired,
};

export default connect(mapStateToProps)(Table);
