import React from 'react';
import { connect } from 'react-redux';
import './ExpensesList.css';
// import PropTypes from 'prop-types';

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
      <tbody key={ id }>
        <tr>
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
          <td>
            R$
            {
              parseInt((exchangeRates[currency].ask * value) * 100, 10) * UM_POR_CENTO
            }
          </td>
          <td>Real</td>
          <td>
            <button
              data-testid="delete-btn"
              type="button"
            >
              apagar
            </button>
          </td>
        </tr>
      </tbody>

    ));
  }

  render() {
    return (
      <section
        className="table-body"
      >
        <table className="table">
          <tbody>
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

          </tbody>
          {this.getExpensesList()}
        </table>
      </section>

    );
  }
}

// ExpensesList.propTypes = {
//   expenses: PropTypes.shape.isRequired,
// };

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpensesList);
