// import React, { useState } from 'react';
// import { render } from 'react-dom';
// import {connect} from 'react-redux';
// import {login} from '../actions';

// let isDisablePws = true;
// let isDisableEmail = true;
// const maxLengthPassword = 6;

// function validatePassword(e) {
//   const { name, value } = e.target;
//   // console.log(value.length);
//   // console.log(` ${name === 'password'}  ${value.length >= maxLengthPassword}`);
//   if (name === 'password' && value.length >= maxLengthPassword) {
//     console.log('passou');
//     isDisablePws = false;
//   } else if (name === 'password') {
//     isDisablePws = true;
//   }
// }

// function validateEmail(e) {
//   const { name, value } = e.target;
//   // console.log(value);
//   const re = /\S+@\S+\.\S+/;
//   if (name === 'email' && re.test(String(value).toLowerCase())) {
//     isDisableEmail = false;
//   } else if (name === 'email') {
//     isDisableEmail = true;
//   }
// }
// class Logui extends React.Component {
// // const Login = () => {
//   constructor() {
//     super();

//     this.state = {
//       email: '',
//       password: '',
//       disableSubmit: 'true',
//       redirect: false,
//     };
//     this.validateEmail = this.validateEmail.bind(this);
//     this.validatePassword = this.validatePassword.bind(this);

//   }

//   // const [from, setFrom] = useState({ email: '', password: '' });
//   function changeFrom(e) {
//     const { name, value } = e.target;
//     this.setState({
//       [name]: value,
//     })
//     // setFrom({ ...from, [name]: value });
//   }
//   function submitFrom(e) {
//     const { name, value } = e.target;
//     e.preventDefault();
//     this.setState({ ...from, [name]: value });
//     console.log(from);
//   }
//   render() {
//     <form onSubmit={ submitFrom }>
//       Email:
//       <input
//         name="email"
//         type="text"
//         data-testid="email-input"
//         required="required"
//         value={ from.email }
//         onKeyUp={ this.validateEmail }
//         onChange={ this.changeFrom }
//       />
//       Senha:
//       <input
//         // codigo inspirado nesse tutorial
//         // https://dev.to/cooljasonmelton/build-this-cool-password-checklist-with-react-and-css-4j1e
//         name="password"
//         type="password"
//         data-testid="password-input"
//         value={ from.password }
//         required="required"
//         onKeyUp={ this.validatePassword }
//         onChange={ this.changeFrom }
//       />
//       <div>
//         <button type="submit" disabled={ isDisablePws && isDisableEmail }>Entrar</button>
//       </div>
//     </form>
//  }
// }
// const mapDispatchToProps = (dispatch) => ({
//   loginWithEmail: (email) => dispatch(login(email)),
// });

// export default connect(null, mapDispatchToProps)(Login);
