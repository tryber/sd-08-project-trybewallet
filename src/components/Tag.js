import React from 'react';

class Tag extends React.Component {
  render() {
    const type = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <label htmlFor="input-payment">
        Tag
        <select name="payment" id="input-payment" data-testid="tag-input">
          {type.map((item) => <option key={ item } value={ item }>{item}</option>)}
        </select>
      </label>
    );
  }
}

export default Tag;
