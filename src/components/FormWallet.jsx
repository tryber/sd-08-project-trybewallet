import React from 'react';
import SelectCategorias from './SelectCategorias';
import SelectPagamento from './SelectPagamento';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

export default class FormWallet extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <input
            data-testid="currency-input"
          />
        </label>
        <div><SelectPagamento /></div>
        <div><SelectCategorias /></div>
      </div>
    );
  }
}
