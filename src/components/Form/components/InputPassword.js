import React from 'react'
import { useDispatch } from 'react-redux';
import { updatePassword } from '../../../actions'

export default function InputPassword() {

  const dispatch = useDispatch()

  function handleChange(e) {
    dispatch(updatePassword(e.target.value))
  }

  return (
    <label htmlFor="password">
      Senha:
      <input
        type="password"
        name="password"
        onChange={ handleChange }
        data-testid="password-input"
      />
    </label>
  )
}
