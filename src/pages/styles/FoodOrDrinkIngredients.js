import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 360px;
  height: 100% + 100vh;
`;

export const CardIngredient = styled.div`
  background: #f7f7ff;
  border-radius: 5px;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.50);
  height: 200px;
  margin: 15px;
  width: 150px;
`;

export const SVG = styled.svg`
  border-radius: 0 5px 5px;
  position: relative;
  top: 110px;
`;

export const Image = styled.img`
  bottom: 80px;
  left: 5px;
  position: relative;
  width: 140px;
`;

export const TitleIngredient = styled.h1`
  bottom: ${(props) => (props['font-size'] === 'regular' ? '80px' : '78px')};
  color: white;
  font-family: Poppins , sans-serif;
  font-size: ${(props) => (props['font-size'] === 'regular' ? '1.45em' : '1.2em')};
  position: relative;
  text-align: center;
  text-transform: uppercase;
  z-index: 99;
`;
