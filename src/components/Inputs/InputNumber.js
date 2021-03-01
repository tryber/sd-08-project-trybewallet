import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateValueAct } from '../../actions';

import { toNumericValue, formatInputNumber } from '../../services';

const { useState, useEffect } = React;

const InputNumber = ({ name, language, placeHolder, label, toState, reset }) => {
  const [textValue, setTextValue] = useState('');
  const [numericValue, setNumericValue] = useState(0);

  const handleChange = (evt) => {
    const { target: { value } } = evt;
    setTextValue(formatInputNumber(value, language));
  };

  useEffect(() => {
    if (reset) setTextValue('');
  }, [reset]);

  useEffect(() => {
    setNumericValue(toNumericValue(textValue));
  }, [textValue]);

  useEffect(() => {
    toState(numericValue);
  }, [numericValue, toState]);

  return (
    <label htmlFor={ name }>
      { label }
      <input
        type="text"
        name={ name }
        id={ name }
        value={ textValue }
        onChange={ handleChange }
        placeholder={ placeHolder }
        data-testid={ name }
      />
    </label>
  );
};

InputNumber.propTypes = {
  name: PropTypes.string,
  language: PropTypes.string,
  placeHolder: PropTypes.string,
  label: PropTypes.string,
  toState: PropTypes.func.isRequired,
  reset: PropTypes.bool,
};

InputNumber.defaultProps = {
  name: '',
  language: 'pt-br',
  placeHolder: '',
  label: '',
  reset: false,
};

const mapDispatch = (dispatch) => ({
  toState: (value) => dispatch(updateValueAct(value)),
});

export default connect(null, mapDispatch)(InputNumber);
