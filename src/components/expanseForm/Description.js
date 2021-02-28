import React from 'react';
import PropTypes from 'prop-types';

class Description extends React.Component {
  render() {
    const { description, onChange } = this.props;
    return (
      <label
        className="div-form"
        htmlFor="description"
        value={ description }
        onChange={ onChange }
      >
        Descrição:
        <input type="text" name="description" data-testid="description-input" />
      </label>
    );
  }
}

export default Description;

Description.propTypes = {
  description: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
