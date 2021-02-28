import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteRegister as deleteRegisterAction } from '../actions';

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.cabecalho = this.cabecalho.bind(this);
  }

  cabecalho() {
    return (
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
    );
  }

  render() {
    const { expenses, deleteRegister, afterDelete } = this.props;
    return (
      <table>
        { this.cabecalho() }
        { expenses.map((expense) => (
          <tr key={ expense.id }>
            <td>{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method }</td>
            <td>{ expense.value }</td>
            <td>{ expense.exchangeRates[expense.currency].name }</td>
            <td>
              {
                parseFloat(expense.exchangeRates[expense.currency].ask)
                  .toFixed(2)
              }
            </td>
            <td>
              {
                parseFloat((expense.value)
                * (expense.exchangeRates[expense.currency].ask))
                  .toFixed(2)
              }
            </td>
            <td>Real</td>
            <td>
              <button type="button">editar</button>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => {
                  deleteRegister(expense);
                  afterDelete((expense.value)
                    * (expense.exchangeRates[expense.currency].ask));
                } }
              >
                x
              </button>
            </td>
          </tr>
        )) }
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.func.isRequired,
  deleteRegister: PropTypes.func.isRequired,
  afterDelete: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteRegister: (expense) => dispatch(deleteRegisterAction(expense)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
