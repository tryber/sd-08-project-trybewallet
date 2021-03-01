import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions';
import tableFields from '../Database/tableFields';

class TableWallet extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderBody = this.renderBody.bind(this);
    this.findByCurrencyElement = this.findByCurrencyElement.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    const { propDeleteExpense } = this.props;
    propDeleteExpense(id);
  }

  findByCurrencyElement({ exchangeRates, currency }) {
    return Object.values(exchangeRates).reduce((acc, e) => {
      if (e.code === currency && e.codein !== 'BRLT') {
        return e;
      }
      return acc;
    }, {});
  }

  renderHeader() {
    return tableFields.map((e) => <th key={ e }>{e}</th>);
  }

  renderBody() {
    const { propExpenses } = this.props;
    return propExpenses.map((e) => {
      const { ask, name } = this.findByCurrencyElement(e);
      return (
        <tr key={ `tablekeydata${e.id}` }>
          <td>{e.description}</td>
          <td>{e.tag}</td>
          <td>{e.method}</td>
          <td>{(e.value * 1)}</td>
          <td>{name}</td>
          <td>{(ask * 1).toFixed(2)}</td>
          <td>{((ask * 1) * (e.value * 1)).toFixed(2)}</td>
          <td>Real</td>
          <td>
            <button
              type="button"
              data-testid="edit-btn"
            >
              E
            </button>
            <button
              type="button"
              data-testid="delete-btn"
              onClick={ () => this.handleDelete(e.id) }
            >
              X
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            {this.renderHeader()}
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {this.renderBody()}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ wallet }) {
  return {
    propExpenses: wallet.expenses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    propDeleteExpense: (id) => dispatch(deleteExpense(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TableWallet);

TableWallet.propTypes = {
  propDeleteExpense: PropTypes.func.isRequired,
  propExpenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape(PropTypes.shape({
      ask: PropTypes.string.isRequired,
      bid: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      codein: PropTypes.string.isRequired,
      create_date: PropTypes.string.isRequired,
      high: PropTypes.string.isRequired,
      low: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      pctChange: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      varBid: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  }).isRequired).isRequired,
};
