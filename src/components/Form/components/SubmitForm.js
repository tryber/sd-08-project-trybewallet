import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

import { REGEX } from '../../../common/defs'

export default function SubmitForm() {

  const { email, password } = useSelector(state => state);

  return (
    <Link to='/carteira'>
      <button
      type="button"
      disabled={ !(REGEX.test(email)) || (password.length <= '5') }
      >
        Entrar
      </button>
    </Link>
  )
}
