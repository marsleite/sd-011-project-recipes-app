import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  FormContainer,
  ContainerInputs,
  Input,
  StyledButton,
  ContainerLogo,
} from './styles';
import Logo from '../../images/logo-600.svg';

function Login() {
  const history = useHistory();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [disableButton, setDisableButton] = useState(true);

  const handleChangeUser = ({ target }) => {
    const { value } = target;
    setUser(value);
  };

  const handleClickLogin = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', `{ "email": "${user}" }`);
    history.push('/comidas');
  };

  useEffect(() => {
    const validateInputs = () => {
      const minPasswordLength = 6;
      // const { email } = user;
      const emailPattern = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
      const validPassword = password.length > minPasswordLength;
      const validEmail = user.match(emailPattern);
      setDisableButton(!(validEmail && validPassword));
    };

    validateInputs();
  }, [user, password]);

  return (
    <FormContainer>
      <form>
        <ContainerLogo>
          <img alt="Logo" src={ Logo } />
        </ContainerLogo>
        <ContainerInputs>
          <div>
            <Input
              type="text"
              data-testid="email-input"
              placeholder="e-mail"
              id="emailInput"
              name="email"
              onChange={ handleChangeUser }
            />

            <Input
              type="password"
              data-testid="password-input"
              placeholder="senha"
              id="passwordInput"
              name="password"
              onChange={ ({ target }) => setPassword(target.value) }
            />
          </div>

          <StyledButton
            type="button"
            data-testid="login-submit-btn"
            disabled={ disableButton }
            id="login-submit-btn"
            name="login-submit-btn"
            onClick={ handleClickLogin }
          >
            ENTRAR
          </StyledButton>
        </ContainerInputs>
      </form>
    </FormContainer>
  );
}

export default Login;
