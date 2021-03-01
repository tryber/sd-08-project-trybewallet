import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateDescriptionAct } from '../../actions';

const { useState, useEffect } = React;

const InputText = ({ name, label, toState, reset }) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target }) => {
    setValue(target.value);
  };

  const handleBlur = () => {
    toState(value);
  };

  useEffect(() => {
    if (reset) setValue('');
  }, [reset]);

  return (
    <label htmlFor={ name }>
      { label }
      <input
        type="text"
        name={ name }
        id={ name }
        value={ value }
        onChange={ handleChange }
        onBlur={ handleBlur }
        data-testid={ name }
      />
    </label>
  );
};

InputText.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  toState: PropTypes.func.isRequired,
  reset: PropTypes.bool,
};

InputText.defaultProps = {
  name: '',
  label: '',
  reset: false,
};

const mapDispatch = (dispatch) => ({
  toState: (value) => dispatch(updateDescriptionAct(value)),
});

export default connect(null, mapDispatch)(InputText);
