import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { excludesData } from '../../actions';

class TableBody extends Component {
  handleClick({ target: { value } }) {
    const { expensesToTable, excludeData } = this.props;
    // console.log(expensesToTable);
    // console.log(value);
    // const buttonValue = value;
    const newList = expensesToTable
      .filter((listItem) => Number(listItem.id) !== Number(value));
    excludeData(newList);
  }

  render() {
    const { expensesToTable } = this.props;
    // console.log(expensesToTable);
    return (
      <tbody>
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
                      value={ tableLine.id }
                      onClick={ (e) => this.handleClick(e) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>))
        }
      </tbody>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesToTable: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  excludeData: (param) => dispatch(excludesData(param)),
});

TableBody.propTypes = {
  expensesToTable: PropTypes.arrayOf(PropTypes.object).isRequired,
  excludeData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableBody);
