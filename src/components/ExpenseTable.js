import React from 'react';

class ExpenseTable extends React.Component {
  render() {
    return (
      <div>
        <table>
          <tr>
            <th>Month</th>
            <th>Savings</th>
          </tr>
          <tr>
            <td>January</td>
            <td>$100</td>
          </tr>
          <tr>
            <td>February</td>
            <td>$80</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default ExpenseTable;
