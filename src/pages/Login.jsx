import React from 'react';

function Login() {
  return (
    <div>
      <input
        type="email"
        data-testid="email-input"
        placeholder="email"
      />
      <input
        type="password"
        data-testid="password-input"
        placeholder="senha"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
