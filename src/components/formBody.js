import React from 'react';
import PropTypes from 'prop-types';

class FormBody extends React.Component {
  render() {
    const { handleinput, stateRedux } = this.props;
    return (
      <>
        <label htmlFor="despesalabel">
          Despesa
          <input
            type="text"
            data-testid="value-input"
            name="value"
            onChange={ handleinput }
          />
        </label>
        <label htmlFor="descricaolabel">
          Descricao
          <input
            types="text"
            data-testid="description-input"
            name="description"
            onChange={ handleinput }
          />
        </label>
        <label htmlFor="moedalabel">
          Moeda:
          <select
            data-testid="currency-input"
            onChange={ this.handleInput }
            name="currency"
          >
            {stateRedux.map((moeda) => (
              (moeda !== 'USDT')
        && (
          <option key={ moeda } data-testid={ moeda }>
            {moeda}
          </option>
        )
            ))}
          </select>
        </label>
      </>
    );
  }
}
FormBody.propTypes = {
  stateRedux: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleinput: PropTypes.func.isRequired,

};
export default FormBody;
