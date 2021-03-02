import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteRegister as deleteRegisterAction } from '../actions/index';

class ExpensesTable extends React.Component {
  constructor() {
    super();
    this.headerTable = this.headerTable.bind(this);
  }

  headerTable() {
    return (
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
    );
  }

  render() {
    const { allExpenses } = this.props;
    return (
      <table>
        { this.headerTable() }
        { allExpenses.map((element) => {
          const {
            id,
            value,
            currency,
            method,
            tag,
            description,
            exchangeRates,
          } = element;
          const { deleteRegister } = this.props;
          return (
            <tbody key={ id }>
              <tr>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{value}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>
                  {parseFloat(value * exchangeRates[currency].ask).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button type="button">Editar</button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => deleteRegister(element) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          );
        }) }
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  allExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteRegister: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  allExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteRegister: (e) => dispatch(deleteRegisterAction(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
