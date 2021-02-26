import React, { Component } from 'react';

class FormExpense extends Component {
  render() {
    return (
      <div>
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

        </form>
      </div>
    );
  }
}

export default FormExpense;
