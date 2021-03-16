import React, { Component } from 'react';
import InputEmail from './components/InputEmail';
import InputPassword from './components/InputPassword';
import SubmitForm from './components/SubmitForm';

import { REGEX } from '../../common/defs';
// import { saveEmail } from '../../../actions';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangeEmail({ target }) {
    this.setState((state) => ({
      ...state, email: target.value,
    }));
  }

  handleChangePassword({ target }) {
    this.setState((state) => ({
      ...state, password: target.value,
    }));
  }

  handleClick() {

  }

  render() {
    const { email, password } = this.state;
    return (
      <>
        <InputEmail handleChange={ this.handleChangeEmail } />
        <InputPassword handleChange={ this.handleChangePassword } />
        <SubmitForm state={ this.handleClick } disabled={ !(REGEX.test(email)) || (password.length <= '5') } />
      </>
    );
  }
}

export default LoginForm;

// export default function LoginForm() {
//   const [state, setState] = useState({
//     email: '',
//     password: '',
//   });

//   return (
//     <>
//       <InputEmail state={ state } setState={ setState } />
//       <InputPassword state={ state } setState={ setState } />
//       <SubmitForm state={ state } />
//     </>
//   );
// }
