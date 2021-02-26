import React, { Component } from 'react';
import getAPI from '../services/requestAPI';

class FormExpense extends Component {
  render() {
    return (

      <div>
        { console.log(getAPI()) }
        <form>
          <label htmlFor="value">
            Despensa:
            <input
              type="text"
              id="value"
              data-testid="value-input"
              value={ null }
              name="value"
              onChange={ null }
            />
          </label>

          <label htmlFor="description">
            Description:
            <input
              type="text"
              id="description"
              data-testid="description-input"
              value={ null }
              name="description"
              onChange={ null }
            />
          </label>

          <span>Moeda:</span>
          <select
            data-testid="currency-input"
            value={ null }
            name="currency"
            onChange={ null }
          >
            <option>USD</option>
          </select>

        </form>
      </div>
    );
  }
}

export default FormExpense;
