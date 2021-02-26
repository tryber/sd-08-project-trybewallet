import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ListaDeGastos extends Component {
  render() {
    const { valor } = this.props;
    return (
      <div data-testid="total-field">
        Total de Despesas:
        {' '}
        {valor}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  valor: state.wallet.expenses.valor,
});

export default connect(mapStateToProps)(ListaDeGastos);

ListaDeGastos.propTypes = {
  valor: PropTypes.string.isRequired,
};
