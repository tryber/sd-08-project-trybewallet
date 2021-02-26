import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getAPI from '../services/requestAPI';
import { actionWalletCurrencies } from '../actions/walletActions';

class expenseForm extends React.Component {
  componentDidMount() {
    const { updateValues } = this.props;
    updateValues(getAPI());
    console.log(getAPI());
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    // const { currencies } = this.props;

    return (
      <form className="form" onSubmit={ this.handleSubmit }>
        <div>
          <label
            htmlFor="value"
          >
            Valor:
            <input
              type="number"
              name="value"
              onChange={ this.handleChangeValue }
              data-testid="value-input"
            />
          </label>
        </div>
        <div>
          <label
            htmlFor="currency"
          >
            Moeda:
            <select
              name="currency"
              data-testid="currency-input"
            >
              {/* {currencies.map((currency) => (
                <option data-testid={ currency } key={ currency }>{ currency }</option>
              ))} */}
            </select>
          </label>
        </div>
        <div>
          <label
            htmlFor="description"
          >
            Descrição:
            <input
              type="text"
              name="description"
              onChange={ this.handleChangeDescription }
              data-testid="description-input"
            />
          </label>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  updateValues: (dataAPI) => dispatch(actionWalletCurrencies(dataAPI)),
});

export default connect(mapStateToProps, mapDispatchToProps)(expenseForm);

expenseForm.propTypes = {
  updateValues: PropTypes.func.isRequired,
  // currencies: PropTypes.objectOf.isRequired,
};
