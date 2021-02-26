import React from 'react';
import PropTypes from 'prop-types';

class Inputs extends React.Component {
  render() {
    const { children, name, type, dataTest, onChange, inputValue } = this.props;
    return (
      <label htmlFor="inputText">
        { children }
        <input
          type={ type }
          name={ name }
          data-testid={ dataTest }
          value={ inputValue }
          onChange={ onChange }
        />
      </label>
    );
  }
}

Inputs.propTypes = {
  // PropType de children encontrada no link abaixo:
  // https://qastack.com.br/programming/42122522/reactjs-what-should-the-proptypes-be-for-this-props-children
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  dataTest: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};

export default Inputs;
