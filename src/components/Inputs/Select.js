import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { chooseWalletInputAct } from '../../actions';

const { useState, useEffect } = React;

const Select = ({ name, data, label, toState, reset }) => {
  let initialState = '';
  switch (name) {
  case 'tag-input':
    initialState = 'Alimentação';
    break;
  case 'method-input':
    initialState = 'Dinheiro';
    break;
  case 'currency-input':
    initialState = 'USD';
    break;
  default:
    break;
  }
  const [value, setValue] = useState(initialState);

  useEffect(() => {
    if (reset) setValue(initialState);
  }, [reset, initialState]);

  const handleChange = ({ target }) => {
    setValue(target.value);
  };

  useEffect(() => {
    toState(name, value);
  }, [value, name, toState]);

  return (
    <label htmlFor={ name }>
      { label }
      <select
        data-testid={ name }
        value={ value }
        onChange={ handleChange }
        id={ name }
      >
        { data.map((opt) => (
          <option value={ opt } key={ opt } data-testid={ opt }>
            { opt }
          </option>
        )) }
      </select>
    </label>
  );
};

Select.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  toState: PropTypes.func.isRequired,
  reset: PropTypes.bool,
};

Select.defaultProps = {
  name: '',
  label: '',
  reset: false,
};

const mapDispatch = (dispatch) => ({
  toState: (name, value) => dispatch(chooseWalletInputAct(name, value)),
});

export default connect(null, mapDispatch)(Select);
