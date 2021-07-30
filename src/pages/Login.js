import React, { useState } from 'react';

export default function Login() {
  const [invalidPassword, setInvalidPassword] = useState(true);
  const [invalidEmail, setInvalidEmail] = useState(true);

  // Verifica se o email é válido
  const handleEmail = (event) => {
    const re = /\S+@\S+\.\S+/;
    if (re.test(event.target.value)) {
      setInvalidEmail(false);
    }
  };

  // Verifica se a senha é válida
  const handlePassword = (event) => {
    const password = event.target.value;
    const lengthPassword = 6;
    if (password.length > lengthPassword) {
      setInvalidPassword(false);
    }
  };

  return (
    <div>
      <label htmlFor="email">
        E-mail:
        <input
          type="email"
          name="email"
          data-testid="email-input"
          onChange={ handleEmail }
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          name="password"
          data-testid="password-input"
          onChange={ handlePassword }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ invalidEmail || invalidPassword }
      >
        Entrar
      </button>
    </div>
  );
}
