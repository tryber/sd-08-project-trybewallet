import React from 'react';

export default function Login() {
  return (
    <form>
      <input
        data-testid="email-input"
        type="text"
        placeholder="name@example.com"
      />
      <input
        data-testid="password-input"
        type="text"
        placeholder="atleast 6 characters"
      />
      <button
        type="submit"
      >
        Entrar
      </button>
    </form>
  );
}
