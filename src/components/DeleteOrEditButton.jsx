import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { expanseDelete, expanseEdit } from '../actions';

export default function DeleteOrEditButton({ indexProps }) {
  const dispatch = useDispatch();
  return (
    <>
      <button
        type="button"
        onClick={ () => dispatch(expanseEdit(indexProps)) }
        data-testid="edit-btn"
      >
        Editar
      </button>
      <button
        type="button"
        onClick={ () => dispatch(expanseDelete(indexProps)) }
        data-testid="delete-btn"
      >
        Deletar despesa
      </button>
    </>
  );
}

DeleteOrEditButton.propTypes = {
  indexProps: PropTypes.number.isRequired,
};
