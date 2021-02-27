import React from 'react';
// import PropTypes from 'prop-types';

export default class Table extends React.Component {
  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Método de Pagamento |</th>
              <th>Tag |</th>
              <th>Valor  |</th>
              <th>Moeda  |</th>
              <th>Câmbio Utilizado  |</th>
              <th>Valor Convertido  |</th>
              <th>Moeda de Conversão  |</th>
              <th>Editar/Excluir  |</th>
            </tr>
          </thead>
          {/* <tbody key={ id }>
            <tr>
              <td>{descricao}</td>
              <td>{tag}</td>
              <td>{metodo}</td>
              <td>{valor}</td>
              <td>{moeda}</td>
              <td>{parseFloat(ask).toFixed(2)}</td>
              <td>{(ask * value).toFixed(2)}</td>
              <td>Real</td>
              <td> */}
          <button
            type="button"
            // onClick={ () => btEditarTab(expense) }
            data-testid="edit-btn"
          >
            Edit
          </button>
          <button
            type="button"
            // onClick={ () => btDelete(id) }
            data-testid="delete-btn"
          >
            Excluir
          </button>
          {/* </td>
            </tr>
          </tbody> */}
        </table>
      </div>
    );
  }
}
