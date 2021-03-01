import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import store from '../store';

class ListaDeGastos extends Component {
  constructor() {
    super();
    this.state = {
      valor: 0,
    };
    this.changevalor = this.changevalor.bind(this);
  }

  changevalor() {
    let { valor } = this.state;
    const stateAuxiliar = store.getState().wallet.auxiliar;
    const stateExpenses = store.getState().wallet.expenses;
    const { arrDeValores, arrFinal } = stateAuxiliar;
 console.log(stateExpenses.map((item) => item[0]));
  
for (let f = 0; f < stateExpenses.length; f += 1)

  //   for (let f = 0; f < stateExpenses.length; f += 1) {
  //     for (let i = 0; i < arrDeValores.length; i += 1) {
  //       if (stateExpenses[f].currency === arrFinal[i]) {
  //         this.setState({ valor: valor += arrDeValores[i] * stateExpenses[f].value,
  //         });
  //       }
  //     }
  //   }
  // }

  render() {
    const { valor } = this.state;

    return (
      <div data-testid="total-field">
        Total de Despesas:
        {' '}
        {valor}
        <button type="button" onClick={ () => this.changevalor() }>changeVla</button>
      </div>
    );
  }
}

const mapStateToProps = (expenses, auxiliar) => ({
  value: expenses.value,
  arrDeValores: auxiliar.arrDeValores,
  arrFinal: auxiliar.arrFinal,
  currency: expenses.currency,
});

// const mapDispatchToProps = (dispatch) => ({
//   expenses: (expenses) => dispatch({ type: 'ADD_DESPESA', expenses }),
// });

export default connect(mapStateToProps)(ListaDeGastos);
// const mapStateToProps = (state) => ({
//   valor: state.wallet.expenses.valor,
// });

// export default connect(mapStateToProps)(ListaDeGastos);

// ListaDeGastos.propTypes = {
//   valor: PropTypes.shape.isRequired,
// };
