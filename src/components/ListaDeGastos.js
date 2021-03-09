import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ListaDeGastos extends Component {
  constructor() {
    super();
    this.changevalor = this.changevalor.bind(this);
    this.lintChato = this.lintChato.bind(this);
  }

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
    if (typeof (stateAuxiliar) !== 'undefined') {
      const { arrFinal, arrDeValores } = stateAuxiliar;
      total = this.lintChato(arrFinal, stateExpenses, arrDeValores);
    }
    return total;
  }

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
  stateAuxiliar: state.wallet.auxiliar,
  stateExpenses: state.wallet.expenses,
});

ListaDeGastos.propTypes = {
  stateAuxiliar: PropTypes.shape.isRequired,
  stateExpenses: PropTypes.shape.isRequired,
};
export default connect(mapStateToProps)(ListaDeGastos);
