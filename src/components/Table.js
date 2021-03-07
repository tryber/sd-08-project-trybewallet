import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  render() {
    const { despesas, obj } = this.props;
    const cambios = Object.values(obj).filter((name) => name.name !== 'Dólar Turismo')
      .map((data) => data);
    return (
      <>
        <p>Table aqui</p>
        <table>
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
          <tbody>
            {despesas.filter((id) => id.id >= 0)
              .map((expense) => (
                <tr key={ expense.id }>
                  <td>{expense.descricao}</td>
                  <td>{expense.tages}</td>
                  <td>{expense.metodo}</td>
                  <td>{expense.valor}</td>
                  <td>{cambios.find((name) => name.code === expense.moeda).name}</td>
                  <td>{cambios.find((name) => name.code === expense.moeda).ask}</td>
                  <td>
                    {Number(expense.valor) * Number(cambios
                      .find((name) => name.code === expense.moeda).ask)}
                  </td>
                  <td>Real Brasileiro </td>
                  <td>
                    <button type="button">Editar</button>
                    <button type="button">Excluir</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  }
}

Table.propTypes = {
  despesas: PropTypes.arrayOf(PropTypes.object).isRequired,
  obj: PropTypes.arrayOf(PropTypes.array).isRequired,
};

const mapStateToProps = (state) => ({
  despesas: state.addExpense.expenses,
  obj: state.wallet.obj,
});

export default connect(mapStateToProps, null)(Table);
