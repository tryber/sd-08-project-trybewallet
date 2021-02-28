import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import * as actions from '../actions';

function WalletTableItem({ data, ...rest }) {
  const dispatch = useDispatch();
  return (
    <tr role="row" { ...rest }>
      <td role="cell">{ data.description }</td>
      <td role="cell">{ data.tag }</td>
      <td role="cell">{ data.method }</td>
      <td role="cell">{ data.value }</td>
      <td role="cell">{ Number(data.ask).toFixed(2) }</td>
      <td role="cell">{ data.name }</td>
      <td role="cell">{ data.converted }</td>
      <td role="cell"> Real </td>
      <td role="cell">
        <button
          type="button"
          data-testid="delete-btn"
          onClick={ () => dispatch(actions.delExpense(data.id)) }
        >
          REMOVER

        </button>
        <button
          type="button"
          data-testid="edit-btn"
          onClick={ () => dispatch(actions.enterEditMode(data.id)) }
        >
          EDITAR
        </button>
      </td>
    </tr>
  );
}

WalletTableItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ask: PropTypes.string.isRequired,
    converted: PropTypes.string.isRequired,
  }).isRequired,
};

export default WalletTableItem;
