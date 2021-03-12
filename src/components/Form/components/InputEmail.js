import React from 'react'
import { useDispatch } from 'react-redux';
import { updateEmail } from '../../../actions'

export default function InputEmail() {

  const dispatch = useDispatch()

  function handleChange(e) { 
    dispatch(updateEmail(e.target.value))
  }

  return (
    <label htmlFor="email">
      E-mail:
      <input
        type="text"
        name="email"
        onChange={ handleChange }
        data-testid="email-input"
      />
    </label>
  )
}
