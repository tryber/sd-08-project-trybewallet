import React, { Component } from 'react';

class InputPassword extends Component {
  render() {
    const { handleChange } = this.props;
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
    );
  }
}

export default InputPassword;

// export default function InputPassword(props) {
//   const { state, setState } = props;

//   function handleChange({ target }) {
//     setState({ ...state, password: target.value });
//   }

//   return (
//     <label htmlFor="password">
//       Senha:
//       <input
//         type="password"
//         name="password"
//         onChange={ handleChange }
//         data-testid="password-input"
//       />
//     </label>
//   );
// }
