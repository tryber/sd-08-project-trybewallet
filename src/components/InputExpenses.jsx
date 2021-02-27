import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import handleInputsAction from '../actions/handleInputs';

class InputExpenses extends Component {
  constructor() {
    super();

    this.state = {
      input: '',
    };

    this.changeInput = this.changeInput.bind(this);
  }

  changeInput(event) {
    const { target: { value } } = event;
    const { handlingChange } = this.props;
    this.setState({
      input: value,
    });
    handlingChange(event);
  }

  render() {
    const { input } = this.state;
    return (
      <label htmlFor="value">
        Valor:
        <input
          name="value"
          type="text"
          value={ input }
          onChange={ this.changeInput }
          data-testid="value-input"
        />
      </label>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handlingChange: (event) => dispatch(handleInputsAction(event)),
});

InputExpenses.propTypes = {
  handlingChange: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(InputExpenses);
