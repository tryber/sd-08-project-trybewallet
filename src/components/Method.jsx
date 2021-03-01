import React from 'react';
import PropTypes from 'prop-types';

class Method extends React.Component {
  render() {
    const { func } = this.props;
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select data-testid="method-input" id="method" onChange={ func }>
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }
}

Method.propTypes = {
  func: PropTypes.func.isRequired,
};

export default Method;
