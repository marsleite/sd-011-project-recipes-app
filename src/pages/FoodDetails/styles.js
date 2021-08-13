import styled from 'styled-components';

export const MainContainerDetails = styled.main`
  padding: var(--global-space);
  h1, h2, h3, h4, h5, h6 {
    color: var(--red-first-color);
  }
`;

export const ContainerFood = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: center;
  padding: 1.7rem;
  > h1 {
    font-family: var(--font-second);
  }
  > h2 {
    font-family: var(--font-second);
  }
  > img {
    width: 300px;
  }
  > div {
    display: flex;
    gap: 0.8rem;
    
    > button {
      background: none;
      border: none;
      color: var(--red-first-color);
      font-size: 2rem;
      outline: none;
      
      &:active {
        outline: none;
      }
      &:hover {
        outline: none;
      }
    }
  }
`;

export const ContainerRecipes = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  > section {
    > span, > li {
      font-family: var(--font-second);
    } 
    > ul {
      list-style-type: none;
    }
  }
`;
