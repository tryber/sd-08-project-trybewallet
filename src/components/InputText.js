import React from 'react';
import PropTypes from 'prop-types';

class InputText extends React.Component {
  render() {
    const { children, name, dataTest, onChange, value } = this.props;
    return (
      <label htmlFor={ name }>
        { children }
        <input
          type="text"
          name={ name }
          data-testid={ dataTest }
          value={ value }
          onChange={ onChange }
        />
      </label>
    );
  }
}

InputText.propTypes = {
  // PropType de children encontrada no link abaixo:
  // https://qastack.com.br/programming/42122522/reactjs-what-should-the-proptypes-be-for-this-props-children
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  dataTest: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

InputText.defaultProps = {
  value: '',
};

export default InputText;
