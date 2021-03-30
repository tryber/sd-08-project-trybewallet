import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BsTrash } from 'react-icons/bs';
import { BiEdit } from 'react-icons/bi';
import {
  deleteExpense as deleteExpenseAction,
  editExpense as editExpenseAction,
  editStatus as editStatusAction }
  from '../actions/wallet';
import '../styles/tabela.css';

class Tabela extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  linhasTabela() {
    const { wallet, deleteExpense, editExpense, editStatus } = this.props;
    const { expenses } = wallet;
    return (
      expenses.map((e) => (
        <tr key={ e.id } role="row">
          <td>{e.description}</td>
          <td>{e.tag}</td>
          <td>{e.method}</td>
          <td>{e.value}</td>
          <td>{e.exchangeRates[e.currency].name }</td>
          <td>
            {parseFloat(e.exchangeRates[e.currency].ask).toFixed(2)}
          </td>
          <td>
            { (e.value * e.exchangeRates[e.currency].ask).toFixed(2) }
          </td>
          <td>Real</td>
          <td>
            <BsTrash
              type="button"
              data-testid="delete-btn"
              onClick={ () => deleteExpense(e.id) }
              size="30px"
              className="button-delete"
            >
              deletar
            </BsTrash>
            <BiEdit
              type="button"
              data-testid="edit-btn"
              onClick={ () => { editExpense(e); editStatus(true); } }
              size="30px"
              className="button-edit"
            >
              editar
            </BiEdit>

          </td>
        </tr>))
    );
  }

  render() {
    return (
      <div className="container-tabela">
        <div className="box-tabela">
          <table className="table table-bordered border-primary">
            <tr className="table-active">
              <th className="table-active">Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
            {this.linhasTabela()}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (payload) => dispatch(deleteExpenseAction(payload)),
  editExpense: (payload) => dispatch(editExpenseAction(payload)),
  editStatus: (payload) => dispatch(editStatusAction(payload)),
});

Tabela.propTypes = {
  wallet: PropTypes.shape({
    expenses: PropTypes.shape({
      value: PropTypes.string,
      map: PropTypes.func,
    }).isRequired,
  }),
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  editStatus: PropTypes.func.isRequired,
};
Tabela.defaultProps = {
  wallet: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabela);
