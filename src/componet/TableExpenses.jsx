import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class TableExpenses extends Component {
  render() {
    return (
      <div>
        Tabela prototipo
      </div>
    );
  }
}
TableExpenses.propTypes = {
  // send: PropTypes.func.isRequired,
  // fetchCurrent: PropTypes.func.isRequired,
  // // currency: PropTypes.objectOf().isRequired,
  // // expenses: PropTypes.objectOf().isRequired,
  // exchangeRates: PropTypes.objectOf().isRequired,
};

function mapStateToProps(state) {
  return {
    // currency: state.wallet.currency,
    expenses: state.wallet.expenses,
    // exchangeRates: state.wallet.exchangeRates,
  };
}

const mapDispatchToProps = (dispatch) => ({
  // send: (xablau) => dispatch(addRegister(xablau)),
  fetchCurrent: (xublau) => dispatch(GetAPIData(xublau)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);
