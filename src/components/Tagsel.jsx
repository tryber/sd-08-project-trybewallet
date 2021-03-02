import {React, useState } from 'react';

const { INITIAL_VALUE } = this.props;
const [data, setData] = useState(INITIAL_VALUE);

const handleChange = ({ target }) => {
  const { name, value } = target;
  setData({
    ...data,
    [name]: value,
  });
};

export default function tagSel() {

  return (
    <select
      name="tag"
      data-testid="tag-input"
      role="combobox"
      onChange={ handleChange }
    >
      <option value="Alimentação">Alimentação</option>
      <option value="Lazer">Lazer</option>
      <option value="Trabalho">Trabalho</option>
      <option value="Transporte">Transporte</option>
      <option value="Saúde">Saúde</option>
    </select>
  );
}
