import React from 'react';
import SelectCategorias from './SelectCategorias';
import SelectPagamento from './SelectPagamento';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
export default class FormWallet extends React.Component {
  render() {
    // const { arrayCoins } = this.props;
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
            // value={ coins }
            // onChange={ (event) => handleChange(event) }
          />
          {/* {arrayCoins.map((coin) => (
            <option
              key={ coin }
              value={ coin }
              data-testid={ coin }
            >
              {coin}
            </option>
          ))} */}
        </label>
        <SelectPagamento />
        <SelectCategorias />
        <button
          type="button"
        >
          Adicionar despesa
        </button>
        <button
          type="button"
        >
          Editar despesa
        </button>
      </div>
    );
  }
}
