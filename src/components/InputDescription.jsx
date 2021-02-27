import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import handleInputsAction from '../actions/handleInputs';

class InputDescription extends Component {
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
      <label htmlFor="description">
        Descrição:
        <input
          name="description"
          type="text"
          value={ input }
          onChange={ this.changeInput }
          data-testid="description-input"
        />
      </label>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handlingChange: (event) => dispatch(handleInputsAction(event)),
});

InputDescription.propTypes = {
  handlingChange: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(InputDescription);
