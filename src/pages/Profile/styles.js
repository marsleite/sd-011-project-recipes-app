import styled from 'styled-components';
import SharedButton from '../../styles/shared/Button';
import SharedContainerHeader from '../../styles/shared/ContainerHeader';

export const ContainerProfile = styled(SharedContainerHeader)`
  text-align: center;
  > h1 {
    width: 100%;
    font-family: var(--font-first);
    font-size: 1.2rem;
    color: #F1FAEE;
    border: 1px solid #F1FAEE;
    background: var(--background-second-color);
    border-radius: 6px;
    padding: 0.8rem;
  }
  
  > div {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }
`;

export const ButtonProfile = styled(SharedButton)`
  padding: 1rem;
  width: 190px;
  font-family: var(--font-second);
`;

export const ButtonLogout = styled(SharedButton)`
  padding: 1rem;
  width: 190px;
  font-family: var(--font-second);
  color: #F1FAEE;
  background: var(--background-second-color);
`;
