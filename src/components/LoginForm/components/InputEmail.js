import React, { Component } from 'react';

class InputEmail extends Component {
  render() {
    const { handleChange } = this.props;
    return (
      <label htmlFor="email">
        E-mail:
        <input
          type="email"
          name="email"
          onChange={ handleChange }
          data-testid="email-input"
        />
      </label>
    );
  }
}

export default InputEmail;
// export default function InputEmail(props) {
//   const { state, setState } = props;

//   function handleChange({ target }) {
//     setState({ ...state, email: target.value });
//   }

//   return (
//     <label htmlFor="email">
//       E-mail:
//       <input
//         type="email"
//         name="email"
//         onChange={ handleChange }
//         data-testid="email-input"
//       />
//     </label>
//   );
// }
