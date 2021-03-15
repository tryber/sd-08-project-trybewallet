import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestCurrency } from '../../actions';
import getCurrency from '../../services/Service';

class SelectCurrency extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: [],
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  async fetchCurrencies() {
    const { requestCurr } = this.props;
    const currencies = await getCurrency();
    // console.log(currencies);
    this.setState({
      currencies,
    });
    requestCurr(currencies);
  }

  render() {
    const { currencies } = this.state;
    const { handleChange } = this.props;
    // console.log(currencies);
    return (
      <select name="currency" data-testid="currency-input" onChange={ handleChange }>
        {
          currencies.map((curr) => (
            <option
              key={ curr }
              data-testid={ curr }
            >
              {curr}
            </option>))
        }
      </select>
    );
  }
}

// const mapStateToProps = (state) => ({

// });

const mapDispatchToProps = (dispatch) => ({
  requestCurr: (param) => dispatch(requestCurrency(param)),
});

SelectCurrency.propTypes = {
  requestCurr: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SelectCurrency);
