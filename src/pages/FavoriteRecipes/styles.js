import styled from 'styled-components';
import SharedFilterContainer from '../../styles/shared/FilterContainer';
import SharedContainerHeader from '../../styles/shared/ContainerHeader';

export const ContainerFavoriteRecipes = styled(SharedContainerHeader)`
  > header {
    > div {
      > h1 {
        font-size: 1.7rem;
      }
    }
  }
`;

export const MainRecipesDoneCard = styled.main`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;

  > section {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    box-shadow: 0 3px 4px 0 rgb(0 0 0 / 10%);
    color: #091444;
    border: 1px solid var(--blue-first-color);
    border-radius: 8px;
    width: 90%;
    min-height: 420px;
    margin-bottom: 0.5rem;
    padding: 0.5rem;

    span {
      color: var(--text-second-color);
    }

    > div {
      > h1 {
        font-family: var(--font-second);
        color: var(--blue-second-color);
      }
      > img {
        width: 90% !important;
        border-radius: 8px;
        padding: 0.8rem;
      }
    }
  }
`;

export const FilterContainer = styled(SharedFilterContainer)``;
