import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { LoginContainer, Container } from '../styles/login';
import logoIcon from '../images/logo.svg';

function Login() {
  const { setEmail, setPassword, disabledData, handleClick } = useContext(UserContext);
  return (
    <LoginContainer>
      <div className="page-grid">
        <aside>
          <div className="img-wrapper">
            <object className="logo-letmeeat" type="image/svg+xml" data={ logoIcon }>
              Logo
            </object>
          </div>
        </aside>
        <div />
        <div />
        <div className="separator" />
        <Container>
          <label htmlFor="email">
            <input
              type="text"
              data-testid="email-input"
              id="email"
              placeholder="e-mail"
              onChange={ (event) => setEmail(event.target.value) }
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              data-testid="password-input"
              id="password"
              placeholder="senha"
              onChange={ (event) => setPassword(event.target.value) }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ disabledData }
            onClick={ () => handleClick() }
          >
            Entrar
          </button>
        </Container>
      </div>
    </LoginContainer>
  );
}

export default Login;
