import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableHead from './TableHead';
import TableBody from './TableBody';

class ExpensesTable extends Component {
  render() {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      return (
        <div>
          <table>
            <TableHead />
            <TableBody />
          </table>
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(ExpensesTable);
