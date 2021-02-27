import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import handleInputsAction from '../actions/handleInputs';

class TagSelection extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
    };

    this.changeSelection = this.changeSelection.bind(this);
  }

  changeSelection(event) {
    const { target: { value } } = event;
    const { handlingChange } = this.props;
    this.setState({
      value,
    });
    handlingChange(event);
  }

  render() {
    const { value } = this.state;

    return (
      <label htmlFor="tag">
        Categoria:
        <select
          name="tag"
          type="text"
          value={ value }
          onChange={ this.changeSelection }
          data-testid="tag-input"
        >
          <option key="choose" value="">Escolha a categoria</option>
          <option key="grocery" value="grocery">Alimentação</option>
          <option key="hobby" value="hobby">Lazer</option>
          <option key="work" value="work">Trabalho</option>
          <option key="transportation" value="transportation">Transporte</option>
          <option key="health" value="health">Saúde</option>
        </select>
      </label>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handlingChange: (event) => dispatch(handleInputsAction(event)),
});

TagSelection.propTypes = {
  handlingChange: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(TagSelection);
