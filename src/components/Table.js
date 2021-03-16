import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { table } from '../store/service';

class Table extends React.Component {
  constructor() {
    super();

    this.table = this.table.bind(this);
  }

  table() {
    const { expenses } = this.props;
    return expenses.map(
      ({ id, description, method, tag, exchangeRates, currency, value }) => (
        <tr key={ id }>
          <td>{ description }</td>
          <td>{tag}</td>
          <td>{ method }</td>
          <td>{value }</td>
          <td>{ exchangeRates[currency].name }</td>
          <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
          <td>{ (value * exchangeRates[currency].ask).toFixed(2) }</td>
          <td>Real</td>
        </tr>
      ),
    );
  }

  render() {
    return (
      <table>
        <tr>
          {
            table.map((tab, index) => <th key={ index }>{ tab }</th>)
          }
        </tr>
        <tbody>
          {this.table()}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Table);
