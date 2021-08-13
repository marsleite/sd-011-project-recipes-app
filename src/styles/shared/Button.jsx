import styled from 'styled-components';

const Button = styled.button`
  border: none;
  color: #F1FAEE;
  background: var(--background-third-color);
  cursor: pointer;
  margin: 0 auto;
  border-radius: 12px;
  font-weight: bold;
  transition: all 0.3s;
  
  &:disabled {
    opacity: 30%;
  }
`;

export default Button;
