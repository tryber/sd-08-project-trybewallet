import React from 'react';
import PropTypes from 'prop-types';

class Description extends React.Component {
  render() {
    const { func } = this.props;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          type="text"
          data-testid="description-input"
          id="description"
          onChange={ func }
        />
      </label>
    );
  }
}

Description.propTypes = {
  func: PropTypes.func.isRequired,
};

export default Description;
