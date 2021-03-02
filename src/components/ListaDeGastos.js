import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import store from '../store';

class ListaDeGastos extends Component {
  constructor() {
    super();
    // this.state = {
    //   valor: 0,
    // };
    this.changevalor = this.changevalor.bind(this);
  }

  changevalor() {
    const { stateAuxiliar, stateExpenses } = this.props;
    const { arrFinal } = stateAuxiliar;
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

  render() {
    // const { valor } = this.state;

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
//   valor: PropTypes.shape.isRequired,
// };
