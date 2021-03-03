import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenditure, changeEdit } from '../../actions';

import './TableExpenditure.css';

class TableExpenditure extends React.Component {
  constructor() {
    super();
    this.arrHeader = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];
  }

  getTotal({ exchangeRates, currency, value }) {
    const total = Number(exchangeRates[currency].ask) * Number(value);
    return total;
  }

  tableHeader() {
    return (
      <thead className="header-table">
        <tr>
          { this.arrHeader.map((el, index) => (
            <th key={ index }>{el}</th>
          ))}
        </tr>
      </thead>
    );
  }

  tableBody() {
    const {
      expenses,
      deleteExpenditure: deleteRow,
      editSet, onClickSetEdit,
      changeEdit: editSelect } = this.props;
    return (
      <tbody>
        { expenses.map((el, index) => (
          <tr key={ index }>
            <td>{el.description}</td>
            <td>{el.tag}</td>
            <td>{el.method}</td>
            <td>{el.value}</td>
            <td>{el.exchangeRates[el.currency].name}</td>
            <td>
              { (Math.round(el.exchangeRates[el.currency].ask * 100) / 100).toFixed(2) }
            </td>
            <td>
              { (Math.round(this.getTotal(el) * 100) / 100).toFixed(2) }
            </td>
            <td>Real</td>
            <td>
              <button
                data-testid="edit-btn"
                data-idexpenditure={ el.id }
                onClick={ (event) => {
                  editSelect(editSet);
                  onClickSetEdit(event);
                } }
                type="button"
              >
                Editar
              </button>
              <button
                data-idexpenditure={ el.id }
                data-testid="delete-btn"
                onClick={ (event) => deleteRow(expenses, event) }
                type="button"
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  render() {
    return (
      <div className="container-table">
        <table className="content-table">
          { this.tableHeader() }
          { this.tableBody() }
        </table>
      </div>
    );
  }
}

TableExpenditure.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpenditure: PropTypes.func.isRequired,
  editSet: PropTypes.bool.isRequired,
  changeEdit: PropTypes.func.isRequired,
  onClickSetEdit: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
  editSet: wallet.editSet,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenditure: (expenses, id) => dispatch(deleteExpenditure(expenses, id)),
  changeEdit: (editSet) => dispatch(changeEdit(editSet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenditure);
