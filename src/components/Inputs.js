import React from 'react';
import PropTypes from 'prop-types';

class Inputs extends React.Component {
  constructor(props) {
    super(props);
    const { name } = this.props;
    this.state = {
      [name]: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { children, name, type, dataTest } = this.props;
    const { inputValue } = this.state;
    return (
      <label htmlFor="inputText">
        { children }
        <input
          type={ type }
          name={ name }
          data-testid={ dataTest }
          value={ inputValue }
          onChange={ this.handleChange }
        />
      </label>
    );
  }
}

Inputs.propTypes = {
  children: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  dataTest: PropTypes.string.isRequired,
};

export default Inputs;
