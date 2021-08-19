import styled from 'styled-components';

export const Title = styled.h1`
  font-family: Poppins , sans-serif;
  font-size: 40px;
  left: 10px;
  letter-spacing: 0.1em;
  line-height: 72px;
  margin: 20px 0;
  position: relative;
  text-align: center;
`;

export const Yellow = styled.span`
  color: #ffc729;
  font-size: 65px;
`;

export const Green = styled.span`
  color: #a0d468;
  font-size: 65px;
`;

export const Red = styled.span`
  color: #fc6e51;
  font-size: 65px;
`;

export const CardContainer = styled.div`
  align-items: center;
  display: flex;
  height: 220px;
  margin: 10px 25px 40px;
  width: 340px;
`;

export const CardBox = styled.div`
  background: rgba(223, 178, 139, 0.85);
  background: ${(props) => (
    props.food ? '#FC6E51' : '#FFC729'
  )};
  border-radius: 25px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  height: 100px;
  left: 55px;
  left: ${(props) => (props.food ? '55px' : '20px')};
  position: relative;
  top: 70px;
  width: ${(props) => (props.food ? '280px' : '280px')};
`;

export const ImageFood = styled.img`
  align-self: center;
  bottom: 75px;
  height: 170px;
  position: relative;
  text-shadow: 2px 2px 2px black;
  z-index: 98;
`;

export const ImageDrink = styled.img`
  align-self: center;
  bottom: 125px;
  height: 230px;
  left: 170px;
  position: relative;
  text-shadow: 2px 2px 2px black;
  z-index: 98;
`;

export const ImageShadow = styled.div`
  border-radius: 40px;
  bottom: 115px;
  box-shadow: 0 25px 25px rgba(0, 0, 0, 0.9);
  height: 20px;
  left: 30px;
  position: relative;
  width: 125px;
  z-index: 97;
`;

export const CardFoodTitle = styled.h2`
  color: rgba(44, 44, 44, 08);
  font-family: Poppins , sans-serif;
  font-size: 72px;
  letter-spacing: 0.1em;
  line-height: 72px;
  margin: 40px 0 0 100px;
  position: relative;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  top: 60px;
  right: 40px;
  transition: 0.1s;
  z-index: 98;
  ${CardContainer}:hover & {
    transform: scale(1.2, 1.2) translate(-20px);
    transition: 0.15s;
  }
`;

export const CardFoodTitleBordered = styled.h2`
  color: transparent;
  font-family: Poppins , sans-serif;
  font-size: 72px;
  letter-spacing: 0.1em;
  line-height: 72px;
  margin: -72px 0 -35px 100px;
  position: relative;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  -webkit-text-stroke-color: rgba(44, 44, 44, 08);
  -webkit-text-stroke-width: 2px;
  top: 60px;
  right: 40px;
  transition: 0.1s;
  z-index: 99;
  ${CardContainer}:hover & {
    transform: scale(1.2, 1.2) translate(-20px);
    transition: 0.15s;
  }
`;

export const CardDrinkTitle = styled.h2`
  color: rgba(44, 44, 44, 08);
  font-family: Poppins , sans-serif;
  font-size: 72px;
  letter-spacing: 0.1em;
  line-height: 72px;
  margin: 40px 0 0 40px;
  position: relative;
  right: 30px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  top: 60px;
  transition: 0.1s;
  z-index: 98;
  ${CardContainer}:hover & {
    transform: scale(1.2, 1.2) translate(20px);
    transition: 0.15s;
  }
`;

export const CardDrinkTitleBordered = styled.h2`
  color: transparent;
  font-family: Poppins , sans-serif;
  font-size: 72px;
  letter-spacing: 0.1em;
  line-height: 72px;
  margin: -72px 0 -35px 40px;
  position: relative;
  right: 30px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  -webkit-text-stroke-color: rgba(44, 44, 44, 08);
  -webkit-text-stroke-width: 2px;
  top: 60px;
  transition: 0.1s;
  z-index: 99;
  ${CardContainer}:hover & {
    transform: scale(1.2, 1.2) translate(20px);
    transition: 0.15s;
  }
`;
