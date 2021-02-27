import React from 'react';
import { connect } from 'react-redux';
import './ExpensesList.css';

class ExpensesList extends React.Component {
  constructor() {
    super();
    this.getExpensesList = this.getExpensesList.bind(this);
  }

  getExpensesList() {
    const { expenses } = this.props;
    const UM_POR_CENTO = 0.01;

    return expenses.map(({
      description,
      currency,
      method,
      value,
      tag,
      exchangeRates,
      id,
    }) => (
      <tr key={ id }>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>
          {
            exchangeRates[currency].name
          }
        </td>
        <td>
          R$
          {
            parseInt(exchangeRates[currency].ask * 100, 10) / 100
          }
        </td>
        <td 
        id = {id}
        >
          R$
          {
            (parseInt(
              exchangeRates[currency].ask * 100, 10,
            ) * value * UM_POR_CENTO).toFixed(2)
          }
        </td>
        <td>Real</td>
        <td><button type="button"> apagar </button></td>
      </tr>
    ));
  }

//   getTotalValue({ target }) {
//     this.setState({
//       totalValue: {
//         [target.id]:
//       },
//     });
//   }

  render() {
    return (
      <main className="table-body">
        <table className="table">
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
          {this.getExpensesList()}
        </table>
      </main>

    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpensesList);
