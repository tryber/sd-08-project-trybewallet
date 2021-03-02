import React from 'react';
import PropTypes from 'prop-types';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.tableHead = this.tableHead.bind(this);
  }

  tableHead() {
    return (
      <thead>
        <tr>
          <th>Descrição  |</th>
          <th>Tag |</th>
          <th>Método de Pagamento |</th>
          <th>Valor  |</th>
          <th>Moeda  |</th>
          <th>Câmbio Utilizado  |</th>
          <th>Valor Convertido  |</th>
          <th>Moeda de Conversão  |</th>
          <th>Editar/Excluir  |</th>
        </tr>
      </thead>
    );
  }

  render() {
    const { expense, btEditar, btDelete, id } = this.props;
    return (
      <div>
        <table id="wallet-table">
          { this.tableHead }
          {/* {expenses.map((expense) => {
            const { descricao, tag, valor, currency, cotacao, metodo, id } = expense;
            const { name, ask } = cotacao[currency];
            return (
              <tbody key={ id }>
                <tr>
                  <td>{descricao}</td>
                  <td>{tag}</td>
                  <td>{metodo}</td>
                  <td>{valor}</td>
                  <td>{name}</td>
                  <td>{parseFloat(ask).toFixed(2)}</td>
                  <td>{(ask * valor).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                  </td>
                </tr>
              </tbody>
            );
          })} */}
          <button
            type="button"
            onClick={ () => btEditar(expense) }
            data-testid="edit-btn"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={ () => btDelete(id) }
            data-testid="delete-btn"
          >
            Excluir
          </button>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expense: PropTypes.arrayOf(PropTypes.object).isRequired,
  btDelete: PropTypes.func.isRequired,
  btEditar: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
