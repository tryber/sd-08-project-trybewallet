import React from 'react';
import cambio from '../../Data';
import './Form.css';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      cambio,
    };
  }

  render() {
    const { cambio } = this.state;
    return (
      <form className="formulario">
        <label htmlFor="despesa">
          Valor:
          <input
            id="despesa"
            className="despesa"
            type="number"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="descricao">
          Descrição:
          <input
            id="descricao"
            className="descricao"
            type="text"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="cambio">
          Cambio:
          <select>
            Moeda:
            {cambio.map((e) => <option key={ e }>{e}</option>)}
          </select>
        </label>
      </form>
    );
  }
}

export default Form;
