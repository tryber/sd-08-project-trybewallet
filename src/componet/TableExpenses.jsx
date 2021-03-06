import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteRegister } from '../actions';

class TableExpenses extends Component {
  makeLine(expenses) {
    const { deleteButton } = this.props;
    return (
      expenses.map((linha) => (
        <tr key={ linha.id }>
          <td>{linha.description}</td>
          <td>{linha.tag}</td>
          <td>{linha.method}</td>
          {/* https://pt.stackoverflow.com/questions/114740/como-arredondar-com-2-casas-decimais-no-javascript-utilizando-uma-regra-específi */}
          <td>{Math.round(linha.value * 100) / 100}</td>
          <td>{!linha.currency ? 'real' : linha.exchangeRates[linha.currency].name }</td>
          <td>
            {!linha.currency ? 1
              : Math.round(linha.exchangeRates[linha.currency].ask * 100) / 100}

          </td>
          <td>
            { !linha.currency ? Math.round(linha.value * 100) / 100
              : Math.round(
                (linha.value * linha.exchangeRates[linha.currency].ask) * 100,
              ) / 100}
          </td>
          <td>Real</td>
          <td>
            <button
              type="button"
              onClick={ () => deleteButton(linha.id) }
              data-testid="delete-btn"
            >
              Delete
            </button>
            <button type="button" data-testid="edit-btn">Editar despesa</button>
          </td>
        </tr>
      ))
    );
  }

  render() {
    const { expenses } = this.props;
    // console.table(this.props);
    // console.table(expenses);
    return (
      <div>
        <table>
          <tr>
            <td>Descrição</td>
            <td>Tag</td>
            <td>Método de pagamento</td>
            <td>Valor</td>
            <td>Moeda</td>
            <td>Câmbio utilizado</td>
            <td>Valor convertido</td>
            <td>Moeda de conversão</td>
            <td>Editar/Excluir</td>
          </tr>
          {this.makeLine(expenses)}
        </table>
      </div>
    );
  }
}
TableExpenses.propTypes = {
  // send: PropTypes.func.isRequired,
  deleteButton: PropTypes.func.isRequired,
  // // currency: PropTypes.objectOf().isRequired,
  expenses: PropTypes.objectOf().isRequired,
  // exchangeRates: PropTypes.objectOf().isRequired,
};

function mapStateToProps(state) {
  return {
    // currency: state.wallet.currency,
    expenses: state.wallet.expenses,
    // exchangeRates: state.wallet.exchangeRates,
  };
}

const mapDispatchToProps = (dispatch) => ({
  deleteButton: (test) => dispatch(deleteRegister(test)),
  // send: (xablau) => dispatch(addRegister(xablau)),
  // fetchCurrent: (xublau) => dispatch(GetAPIData(xublau)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);
