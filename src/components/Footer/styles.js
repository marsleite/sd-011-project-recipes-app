import styled from 'styled-components';

const FooterContainerButtons = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100vw;
  background: var(--background-third-color);
  display: flex;
  justify-content: space-around;

  > button {
    border: none;
    background: none;
    font-size: 2.5rem;
    
    > svg {
      color: #748067;
    }
  }
`;

export default FooterContainerButtons;
