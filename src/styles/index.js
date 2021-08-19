import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${({ drink }) => (drink ? '#a73d7e' : '#fcdc4d')};
`;

export const TransparentButton = styled.div`
  border: none;
  padding: 0;
  background-color: transparent;
`;

export const Underline = styled.p`
  text-decoration: underline;
`;

export const Container = styled.div`
  height: 100vh;
  padding: 10px;
  background-color: ${({ white }) => (white ? 'white' : '#fcdc4d')};
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const HeaderNavBar = styled.header`
  display: flex;
  flex-direction: column;
  transition: background-color 0.25s;
  background-color: ${({ drink }) => (drink ? '#a73d7e' : '#fcdc4d')};
  border-bottom: 1px solid;
`;

export const FooterBar = styled.footer`
  background-color: ${({ drink }) => (drink ? '#a73d7e' : '#fcdc4d')};
  transition: background-color 0.25s;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid;
  bottom: 0;
  position: fixed;
  width: 100%;
`;

export const CarouselItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 46vw;
  color: black;
  margin: 2vw;
  img {
    width: 42vw;
  }
`;

export const RecipeStateButton = styled.button`
  background-color: #f8f9fa;
  border: 1px solid gray;
  bottom: 0;
  position: fixed;
  width: 100%;
  font-size: 1.2rem;
`;

export const Card = styled.div`
  width: 100%;
  background-color: #f8f9fa;
  border: 1px solid #F8EDED;
  display: flex;
  margin: 10px;
  border-radius: 6px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  .recipe-img{
    width: 50%;
    min-height: 100%;
    border-radius: 6px 0 0 6px;
    img{
      width: 100%;
      border-radius: 6px 0 0 6px;
      height: 100%;
      object-fit: cover;
    }
  }
  .favoriteButton {
      position: absolute;
      padding: 5px;
      background-color: white;
      border-radius: 6px;
      img {
        width: 27px;
      }
    }
  .subtitle{
    color: #A9A9A9;
  }
  .content{
    width: 50%;
  }
  .category {
    background-color: ${({ type }) => (type.includes('bebida') ? '#a73d7e' : '#fcdc4d')};
    border-radius: 6px;
    padding: 5px;
    margin: 2px;
  }
`;
