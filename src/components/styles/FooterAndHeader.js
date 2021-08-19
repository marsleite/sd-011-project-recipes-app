import styled from 'styled-components';

export const FooterContainer = styled.footer`
background-color: #ffc729;
height: 60px;
box-shadow: 0 -4 black;
z-index: 100;
`;

export const Button = styled.button`
position: relative;
top: 2.5px;
border: none;
background-color: #FCD770;
height: 55px;
width: ${(props) => (props.small ? '65px' : '90px')};
border-radius: 10px;
`;

export const Icon = styled.img`
  color: red;
`;
