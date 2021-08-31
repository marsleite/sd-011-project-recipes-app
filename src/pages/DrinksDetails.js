import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import DetailsDrinkHeader from '../components/details/detailsDrink/DetailsDrinkHeader';
import DetailsShareDrinks from '../components/details/detailsDrink/DetailsShareDrinks';
import
DetailsDrinkFavoriteButton
  from '../components/details/detailsDrink/DetailsDrinkFavoriteButton';

import '../styles/components/footer.css';

import RecipesContext from '../context/RecipesContext';
import ButtonStartMeal from '../components/details/ButtonStartMeal';
import
DetailsDrinkIngredientList
  from '../components/details/detailsDrink/DetailsDrinkNoProgress';
import backPage from '../images/arrow-undo-circle-outline.svg';
import Loading from '../components/Loading';

function DrinksDetails() {
  const {
    drinkId,
    getDrinkId,
    mealsRecommend,
  } = useContext(RecipesContext);

  const maximum = 6;

  const { id } = useParams();

  useEffect(() => {
    getDrinkId(id);
  }, [getDrinkId, id]);

  return (
    <div>
      { (drinkId.idDrink === id) ? (
        <div className="details-container">
          <div className="details-header-btn">
            <img className="back-style" src={ backPage } alt="voltar" />
            <DetailsShareDrinks />
          </div>
          <DetailsDrinkHeader />
          <div className="details-title">
            <div className="details-title-info">
              <div>
                <h3 data-testid="recipe-title">{ drinkId.strDrink }</h3>
                <p data-testid="recipe-category">{ drinkId.strAlcoholic }</p>
              </div>
              <DetailsDrinkFavoriteButton id={ id } />
            </div>
          </div>
          <div className="details-info">
            <DetailsDrinkIngredientList />
            <div>
              <h4>Instruction</h4>
              <p data-testid="instructions">{ drinkId.strInstructions }</p>
            </div>
            <div>
              <h4>recomendações</h4>
              <Carousel
                width="100%"
              >
                {
                  mealsRecommend.slice(0, maximum).map((meal, index) => (
                    <Carousel.Item
                      key={ index }
                      data-testid={ `${index}-recomendation-card` }
                    >
                      <img
                        width="100%"
                        alt="Recomendation"
                        src={ meal.strMealThumb }
                      />
                      <Carousel.Caption>
                        <p data-testid={ `${index}-recomendation-title` }>
                          {meal.strMeal}
                        </p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))
                }
              </Carousel>
            </div>
          </div>
          <div>
            <ButtonStartMeal id={ id } type="cocktails" />
          </div>
        </div>
      ) : (<Loading />) }
    </div>
  );
}

export default DrinksDetails;
