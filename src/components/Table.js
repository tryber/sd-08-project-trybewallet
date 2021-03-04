import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense } from '../actions';

class Table extends React.Component {
  render() {
    const { expensesData, remover } = this.props;
    return (

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
          {expensesData.map((item) => (
            <tr key={ item.id }>
              <td>{item.description}</td>
              <td>{item.tag}</td>
              <td>{item.method}</td>
              <td>{item.value}</td>
              <td>{item.exchangeRates[item.currency].name}</td>
              <td>{parseFloat(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
              <td>
                {parseFloat(item.exchangeRates[item.currency]
                  .ask * item.value).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => remover(item.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyData: state.wallet.currencies,
  expensesData: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  remover: (id) => dispatch(removeExpense(id)),
});

Table.propTypes = {
  expensesData: PropTypes.func.isRequired,
  remover: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
