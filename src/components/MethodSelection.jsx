import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import handleInputsAction from '../actions/handleInputs';

class MethodSelection extends Component {
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
      <label htmlFor="method">
        Método de pagamento:
        <select
          name="method"
          type="text"
          value={ value }
          onChange={ this.changeSelection }
          data-testid="method-input"
        >
          <option key="choose" value="">Forma de pagamento</option>
          <option key="money" value="money">Dinheiro</option>
          <option key="debit" value="debit">Cartão de débito</option>
          <option key="credit" value="credit">Cartão de crédito</option>
        </select>
      </label>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handlingChange: (event) => dispatch(handleInputsAction(event)),
});

MethodSelection.propTypes = {
  handlingChange: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(MethodSelection);
