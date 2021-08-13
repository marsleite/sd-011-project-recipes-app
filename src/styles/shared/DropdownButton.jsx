import styled from 'styled-components';
import { DropdownButton } from 'react-bootstrap';

const SharedDropdownButton = styled(DropdownButton)`
  > button {
    background: var(--background-third-color);
    border-color: var(--blue-firts-color);
    font-family: var(--font-second);
  }
`;

export default SharedDropdownButton;
