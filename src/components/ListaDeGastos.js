import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class ListaDeGastos extends Component {
  constructor() {
    super();
    this.state = {
      valor: 0,
    };
  }

  render() {
    const { valor } = this.state;

    return (
      <div data-testid="total-field">
        Total de Despesas:
        {' '}
        {valor}
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   valor: state.wallet.expenses.valor,
// });

// export default connect(mapStateToProps)(ListaDeGastos);

// ListaDeGastos.propTypes = {
//   valor: PropTypes.shape.isRequired,
// };

export default ListaDeGastos;
