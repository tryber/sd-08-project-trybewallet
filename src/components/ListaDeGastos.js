import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import store from '../store';

class ListaDeGastos extends Component {
  constructor() {
    super();
    this.changevalor = this.changevalor.bind(this);
    this.lintChato = this.lintChato.bind(this);
  }

  // changevalor() {
  //   const stateExpenses = store.getState().wallet.expenses;
  //   // const stateAuxiliar = store.getState().wallet.auxiliar;
  //   const { arrFinal, arrDeValores } = store.getState().wallet.auxiliar;
  //   let total = 0;
  //   for (let f = 0; f < stateExpenses.length; f += 1) {
  //     for (let i = 0; i < arrDeValores.length; i += 1) {
  //       if (stateExpenses[f].currency === arrFinal[i]) {
  //         total += arrDeValores[i] * stateExpenses[f].value;
  //       }
  //     }
  //   }
  //   return total;
  // }
  lintChato(arrFinal, stateExpenses, arrDeValores) {
    let total = 0;
    for (let f = 0; f < stateExpenses.length; f += 1) {
      for (let i = 0; i < arrDeValores.length; i += 1) {
        if (stateExpenses[f].currency === arrFinal[i]) {
          total += arrDeValores[i] * stateExpenses[f].value;
        }
      }
    }
    return total;
  }

  changevalor() {
    let total = 0;
    const { stateAuxiliar, stateExpenses } = this.props;
    if (typeof(stateAuxiliar) !== 'undefined') {
      console.log(stateAuxiliar);
      const { arrFinal, arrDeValores } = stateAuxiliar;
      total = this.lintChato(arrFinal, stateExpenses, arrDeValores);
    }
    return total;
  }
  // changhádo() {
  //   return store.subscribe(this.changevalor);
  // }

  render() {
    return (
      <div data-testid="total-field">
        Total de Despesas:
        {' '}
        {this.changevalor()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // arrDeValores: state.wallet.auxiliar.arrDeValores,
  // arrFinal: state.wallet.auxiliar.arrFinal,
  stateAuxiliar: state.wallet.auxiliar,
  stateExpenses: state.wallet.expenses,
});

// const mapDispatchToProps = (dispatch) => ({
//   expenses: (expenses) => dispatch({ type: 'ADD_DESPESA', expenses }),
// });
// export default connect(mapStateToProps)(ListaDeGastos);
// const mapStateToProps = (state) => ({
//   valor: state.wallet.expenses.valor,
// });

export default connect(mapStateToProps)(ListaDeGastos);
// export default ListaDeGastos;
// ListaDeGastos.propTypes = {
//   arrFinal: PropTypes.arrayOf(PropTypes.string).isRequired,
//   arrDeValores: PropTypes.arrayOf(PropTypes.number).isRequired,
//   stateExpenses: PropTypes.shape.isRequired,
// };
