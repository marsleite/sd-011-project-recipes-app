import React, { useEffect, useState } from 'react';

function Login() {
  const regexToEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const regexToPassword = /[\w]{7}/;
  const [isDisabled, setIsDisabled] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  useEffect(() => {
    if (isValidEmail && isValidPassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isValidEmail, isValidPassword]);

  function handleChange({ target: { type, value } }) {
    if (type === 'email') {
      const validated = regexToEmail.test(value);
      if (validated) {
        setIsValidEmail(validated);
      } else if (validated === false) {
        setIsValidEmail(false);
      }
    }
    if (type === 'password') {
      const validated = regexToPassword.test(value);
      if (validated) {
        setIsValidPassword(validated);
      } else if (validated === false) {
        setIsValidPassword(false);
      }
    }
  }

  return (
    <div>
      <input
        type="email"
        data-testid="email-input"
        placeholder="email"
        onChange={ handleChange }
      />
      <input
        type="password"
        data-testid="password-input"
        placeholder="senha"
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
