import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TableBody extends Component {
  render() {
    const { expensesToTable } = this.props;
    // console.log(expensesToTable);
    return (
      <table>
        {
          expensesToTable.length > 0
            && expensesToTable
              .map((tableLine) => (
                <tr key={ tableLine.id }>
                  <td>{tableLine.description}</td>
                  <td>{tableLine.tag}</td>
                  <td>{tableLine.method}</td>
                  <td>{tableLine.value}</td>
                  <td>{tableLine.exchangeRates[tableLine.currency].name}</td>
                  <td>
                    {parseFloat(tableLine.exchangeRates[tableLine.currency].ask)
                      .toFixed(2)}
                  </td>
                  <td>
                    {tableLine.value
                * (+tableLine.exchangeRates[tableLine.currency].ask)}
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                    >
                      Editar / Excluir
                    </button>
                  </td>
                </tr>))
        }

      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesToTable: state.wallet.expenses,
});

// const mapDispatchToProps = (dispatch) => {

// };

TableBody.propTypes = {
  expensesToTable: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(TableBody);
