import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { excludesData, editData } from '../../actions';

class TableBody extends Component {
  handleClick({ target: { value } }) {
    const { expensesToTable, excludeData } = this.props;
    const newList = expensesToTable
      .filter((listItem) => Number(listItem.id) !== Number(value));
    excludeData(newList);
  }

  handleEditClick({ target: { value } }) {
    const { expensesToTable, newData } = this.props;
    // console.log(expensesToTable);
    const editList = expensesToTable
      .find((editItem) => Number(editItem.id) === Number(value));
    console.log(editList.id);
    newData(editList.id);
    // const newEditList = expensesToTable.splice(value, 1, itemEdit);
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
                    {(tableLine.value
                * (+tableLine.exchangeRates[tableLine.currency].ask)).toFixed(2)}
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      value={ tableLine.id }
                      onClick={ (e) => this.handleEditClick(e) }
                    >
                      Editar
                    </button>
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
  newData: (param) => dispatch(editData(param)),
});

TableBody.propTypes = {
  expensesToTable: PropTypes.arrayOf(PropTypes.object).isRequired,
  excludeData: PropTypes.func.isRequired,
  newData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableBody);
