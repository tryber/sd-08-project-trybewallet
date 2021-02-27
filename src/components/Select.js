import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../actions/api';

const THREE = 3;
class Select extends Component {
  componentDidMount() {
    const { fetch } = this.props;
    fetch();
  }

  render() {
    const { currency, id, name, onChange } = this.props;
    // console.log(Object.keys(currency));
    return (
      <div>
        <select onChange={ onChange } name={ name } data-testid={ id }>
          {Object.keys(currency)
            .filter((curr) => curr.length === THREE)
            .map((key) => (
              <option data-testid={ key } key={ key }>{key}</option>
            ))}
        </select>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: (value) => dispatch(fetchCurrencies(value)),
});

Select.propTypes = {
  currency: PropTypes.string.isRequired,
  fetch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Select);
