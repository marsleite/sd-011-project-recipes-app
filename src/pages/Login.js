import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import loginIcon from '../images/loginIcon.svg';
import '../styles/login.css';

export default function Login() {
  const { loginState, setLogin } = useContext(RecipesContext);
  const history = useHistory();

  function handleLogin({ target: { type, value } }) {
    setLogin({ ...loginState, [type]: value });
    const { password, email } = loginState;
    const SIX_PASS = 6;
    const verifyEmail = email.includes('@') && email.includes('.com');
    const verifyPassword = password.length >= SIX_PASS;
    if (verifyEmail && verifyPassword) {
      return setLogin({ ...loginState, isDisabled: false });
    }
  }

  function handleSubmit() {
    const { email } = loginState;
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  }

  return (
    <main className="container">
      <div className="container-login">
        <img height="200px" src={ loginIcon } alt="login ilustration" />
        <div className="login-info">
          <input
            type="email"
            data-testid="email-input"
            placeholder="email"
            onChange={ handleLogin }
          />
          <input
            type="password"
            data-testid="password-input"
            placeholder="senha"
            onChange={ handleLogin }
          />
          <button
            className="button-login"
            type="button"
            data-testid="login-submit-btn"
            disabled={ loginState.isDisabled }
            onClick={ handleSubmit }
          >
            Entrar
          </button>
        </div>
      </div>
    </main>
  );
}
