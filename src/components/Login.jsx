import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const regexToEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const regexToPassword = /[\w]{7}/;
  const [loginState, setLoginState] = useState({
    email: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isValidEmail && isValidPassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isValidEmail, isValidPassword]);

  function handleChange({ target: { type, value } }) {
    if (type === 'email') {
      setLoginState({ ...loginState, [type]: value });
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

  function handleClickLogin() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(loginState));
    history.push('/comidas');
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
        onClick={ handleClickLogin }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
