import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ListaDeGastos extends Component {
  render() {
    const { total } = this.props;
    return (
      <div data-testid="total-field">
        Total de Despesas:
        {' '}
        {total}
        {' '}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  total: state.wallet.total,
});

ListaDeGastos.propTypes = {
  total: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(ListaDeGastos);
