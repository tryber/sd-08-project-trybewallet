import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { REGEX } from '../../../common/defs';
import { saveEmail } from '../../../actions';

export default function SubmitForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state);

  function handleClick() {
    dispatch(saveEmail({ email }));
    history.push('/carteira');
  }

  return (
    <button
      type="button"
      onClick={ handleClick }
      disabled={ !(REGEX.test(email)) || (password.length <= '5') }
    >
      Entrar
    </button>
  );
}
