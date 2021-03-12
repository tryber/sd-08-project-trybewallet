import React from 'react';
import PropTypes from 'prop-types';

class Table extends React.Component {
  render() {
    const { expenses, deleteExpenseProps, buttonEditarTab } = this.props;
    return (
      <div>
        <table id="myTable">
          <thead>
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
          </thead>
          {expenses.map((expense) => {
            const {
              description,
              tag,
              value,
              currency,
              exchangeRates,
              method,
              id,
            } = expense;
            const { name, ask } = exchangeRates[currency];
            return (
              <tbody key={ id }>
                <tr>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{value}</td>
                  <td>{name}</td>
                  <td>{parseFloat(ask).toFixed(2)}</td>
                  <td>{(ask * value).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      onClick={ () => buttonEditarTab(expense) }
                      data-testid="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={ () => deleteExpenseProps(id) }
                      data-testid="delete-btn"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpenseProps: PropTypes.func.isRequired,
  buttonEditarTab: PropTypes.func.isRequired,
};

export default Table;
