import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestCurrency } from '../../actions';
import getCurrencyList from '../../services/getCurrencyList';

class SelectCurrency extends Component {
  componentDidMount() {
    this.fetchCurr();
  }

  async fetchCurr() {
    const { setCurrencies } = this.props;
    const list = await getCurrencyList();
    setCurrencies(list);
  }

  render() {
    const { handleChange } = this.props;
    const { currList } = this.props;
    // console.log(currList);
    return (
      <select
        data-testid="currency-input"
        name="currency"
        onChange={ (e) => handleChange(e.target) }
      >
        {
          currList.length > 0 && currList.map(
            (i) => <option data-testid="USD" key={ `code-${i}` }>{i}</option>,
          )
        }
      </select>

    );
  }
}

SelectCurrency.propTypes = {
  setCurrencies: PropTypes.func,
  currList: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  currList: state.currency.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrencies: (list) => dispatch(requestCurrency(list)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCurrency);
