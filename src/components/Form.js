import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrency } from '../actions';

class Form extends Component {
  componentDidMount() {
    const { fetchCurr } = this.props;
    console.log(fetchCurr);
    fetchCurr();
  }

  render() {
    const { currency } = this.props;
    console.log(currency);
    return (
      <form>
        <label data-testid="value-input" htmlFor="valor">
          Valor:
          <input type="number" id="valor" name="valor" />
        </label>
        <label data-testid="description-input" htmlFor="descriçao">
          Descrição:
          <input type="text" id="descriçao" name="descriçao" />
        </label>
        <label htmlFor="moeda" />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: Object.keys(state.currency.currency),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurr: () => dispatch(fetchCurrency()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
