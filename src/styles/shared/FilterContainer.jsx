import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  > span {
    color: #748067;
    text-align: center;
    font-size: 1.2rem;
    border: 1px solid #748067;
    border-radius: 6px;
    width: 35%;
    padding: 0.24rem;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: var(--font-second);
  }
`;

export default FilterContainer;
