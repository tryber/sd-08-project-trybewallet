import React from 'react';
import PropTypes from 'prop-types';

class MethodAndTag extends React.Component {
  render() {
    const { method, tag, handleChage } = this.props;

    return (
      <div>
        <select
          name="method"
          data-testid="method-input"
          value={ method }
          onChange={ handleChage }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          name="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ handleChage }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </div>
    );
  }
}

MethodAndTag.propTypes = {
  method: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  handleChage: PropTypes.func.isRequired,
};

export default MethodAndTag;
