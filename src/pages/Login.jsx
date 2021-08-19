import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Layout } from '../components';
import LoginGif from '../images/LoginGif.gif';
import '../styles/pages/Login.css';

function Login() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const history = useHistory();

  function validateField(field, type) {
    const MIN_PASSWORD_LENGTH = 7;

    const validators = {
      email: (value) => /(.+)@(.+)\.(.+)/.test(value),
      password: (value) => value.length >= MIN_PASSWORD_LENGTH,
    };

    return validators[type](field);
  }

  function handleLogin(e) {
    e.preventDefault();

    window.localStorage.setItem('mealsToken', '1');
    window.localStorage.setItem('cocktailsToken', '1');

    const user = {
      email: emailInput,
    };

    window.localStorage.setItem('user', JSON.stringify(user));
    history.push('/comidas');
  }

  return (
    <Layout title="Login" noHeader noFooter>
      <main className="LOGIN">
        <header className="hero">
          <h1 className="heading">iCook</h1>
          <img
            className="gif"
            src={ LoginGif }
            alt="loginGif"
            width="700px"
            height="500px"
            padding="100px"
          />
        </header>

        <form
          className="form"
          onSubmit={ handleLogin }
        >
          <input
            className="input"
            data-testid="email-input"
            type="email"
            value={ emailInput }
            placeholder="Email"
            onChange={ ({ target }) => setEmailInput(target.value) }
          />
          <input
            className="input"
            data-testid="password-input"
            type="password"
            value={ passwordInput }
            placeholder="Senha"
            onChange={ ({ target }) => setPasswordInput(target.value) }
          />
          <button
            className="submit"
            data-testid="login-submit-btn"
            type="submit"
            disabled={
              !validateField(emailInput, 'email')
              || !validateField(passwordInput, 'password')
            }
          >
            Entrar
          </button>
        </form>
      </main>
    </Layout>
  );
}

export default Login;
