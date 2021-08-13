import styled from 'styled-components';
import SharedDropdownButton from '../../styles/shared/DropdownButton';

export const MainContainerDetails = styled.main`
  padding: var(--global-space);
`;

export const DropdownButton = styled(SharedDropdownButton)``;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  > span {
    color: var(--red-first-color);
    text-align: center;
    font-size: 1.2rem;
    border: 1px solid var(--red-first-color);
    border-radius: 6px;
    width: 25%;
    padding: 0.24rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
