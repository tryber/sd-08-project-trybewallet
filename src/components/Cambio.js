import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Cambio extends Component {
  constructor() {
    super();
    this.inputTabela = this.inputTabela.bind(this);
    this.calculoTotal = this.calculoTotal.bind(this);
  }

  calculoTotal() {
    const { stateExpenses, changeTotal } = this.props;
    let total = 0;
    const arr = stateExpenses.map((objs) => (objs.value
    * (objs.exchangeRates[objs.currency].ask)));
    for (let i = 0; i < arr.length; i += 1) {
      total += arr[i];
    }
    changeTotal(total);
  }

  editExpenses() { console.log('i'); }
  //   const { expenses } = this.props;
  //   const expense = expenses.find((expens) => expens.id === id);
  //   this.setState({
  //     editedId: expense.id,
  //     value: expense.value,
  //     description: expense.description,
  //     currency: expense.currency,
  //     method: expense.method,
  //     tag: expense.tag,
  //     btnName: 'Editar Despesa',
  //   });
  // }

  inputTabela() {
    const { stateExpenses, deleteExpense, editExpense } = this.props;
    const arrTh = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    this.calculoTotal();
    return (
      <table className="table">
        <thead>
          { arrTh.map((item) => <th className="table" key={ item }>{item}</th>)}
        </thead>
        <tbody>
          {stateExpenses.map((objs) => (
            <tr className="table" key={ objs.id }>
              <td className="table">{objs.description}</td>
              <td className="table">{objs.tag}</td>
              <td className="table">{objs.method}</td>
              <td className="table">{objs.value}</td>
              <td className="table">{objs.exchangeRates[objs.currency].name}</td>
              <td className="table">
                {Number(objs.exchangeRates[objs.currency].ask).toFixed(2)}
              </td>
              <td className="table">
                {objs.value
               * (objs.exchangeRates[objs.currency].ask)}
              </td>
              <td className="table">Real</td>
              <td className="table">
                <button
                  type="button"
                  onClick={ () => deleteExpense(objs.id) }
                  data-testid="delete-btn"
                >
                  Excluir
                </button>
                <button
                  type="button"
                  onClick={ () => editExpense(objs.id) }
                  data-testid="edit-btn"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div>
        <div data-testid="header-currency-field">
          CAMBIO BRL :
        </div>
        {this.inputTabela()}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch({ type: 'DELETE_EXPENSES', id }),
  changeTotal: (total) => dispatch({ type: 'CHANGE_TOTAL', total }),
  editExpense: (id) => dispatch({ type: 'EDIT_EXPENSES', id }),
});

const mapStateToProps = (state) => ({
  stateExpenses: state.wallet.expenses,
});

Cambio.propTypes = {
  stateExpenses: PropTypes.shape.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  changeTotal: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cambio);
