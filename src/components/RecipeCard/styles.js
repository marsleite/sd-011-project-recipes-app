import styled from 'styled-components';
import SharedButton from '../../styles/shared/Button';

export const ContainerCard = styled.section`
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  box-shadow: 0 3px 4px 0 rgb(0 0 0 / 10%);
  color: #F1FAEE;
  border: 1px solid var(--blue-first-color);
  border-radius: 8px;
  width: 124px;
  height: 180px;
  margin-bottom: 0.6rem;
  padding: 0.5rem;
  
  img {
    width: 100%;
    border-radius: 8px;
  }
`;

export const ButtonCard = styled(SharedButton)`
  margin-top: 0.4rem;
  
  padding: 0.2rem;
  width: 100%;
  
  overflow: hidden;
  text-overflow: ellipsis;
`;
