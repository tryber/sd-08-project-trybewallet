import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import store from '../store';

class ListaDeGastos extends Component {
  constructor() {
    super();
    this.changevalor = this.changevalor.bind(this);
    this.changhádo = this.changhádo.bind(this);
  }

  changevalor() {
    const { arrFinal, arrDeValores, stateExpenses } = this.props;
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

  changhádo() {
    return store.subscribe(this.changevalor);
  }

  render() {
    return (
      <div data-testid="total-field">
        Total de Despesas:
        {' '}
        {this.changhádo()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  arrDeValores: state.wallet.auxiliar.arrDeValores,
  arrFinal: state.wallet.auxiliar.arrFinal,
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
