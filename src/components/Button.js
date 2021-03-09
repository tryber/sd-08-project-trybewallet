import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { children, onClick } = this.props;
    return (
      <button type="button" onClick={ onClick }>{ children }</button>
    );
  }
}

Button.propTypes = {
  // PropType de children encontrada no link abaixo:
  // https://qastack.com.br/programming/42122522/reactjs-what-should-the-proptypes-be-for-this-props-children
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
