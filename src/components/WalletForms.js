import React, { Component } from 'react';
import { connect } from 'react-redux';

export class WalletForms extends Component {
  render() {
    return (
      <forms>
        <fieldset>
          <label htmlFor="value">
            Outgoing
            <input
              type="number"
              name="value"
              id="value"
              data-testid="value-input"
              min={ 0.00 }
              step=".01"
              // value={ 0.00 }
            />
          </label>
          <label htmlFor="value">
            Description
            <input
              type="text"
              name="description"
              id="description"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currency">
            Currency
            <select
              type="currency"
              name="currency"
              id="currency"
              data-testid="currency-input"
            >
              {' '}
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="hamster">Hamster</option>
              <option value="parrot">Parrot</option>
              <option value="spider">Spider</option>
              <option value="goldfish">Goldfish</option>
            </select>
          </label>
        </fieldset>
      </forms>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(WalletForms);
