import React, { useEffect, useState } from 'react';
import ButtonFavorite from './ButtonFavorite';
import ButtonShare from './ButtonShare';
import ButtonToProgress from './ButtonToProgress';
import Recommended from './Recommended';
import RenderVideo from './RenderVideo';

function DrinkDetailCard() {
  const [drinkDetail, setDrinkDetail] = useState([]);
  const [rec, setRec] = useState([]);
  const [min, setMin] = useState([]);

  const path = window.location.pathname.split('/')[2];

  const drinkToDetail = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const foodRecomend = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    const getUrlDrink = async () => {
      const drink = await fetch(`${drinkToDetail}${window.location.pathname
        .split('/')[2]}`);
      const response = drink.json().then((res) => setDrinkDetail(res.drinks[0]));
      return response;
    };

    const getRecomend = async () => {
      const recomend = await fetch(`${foodRecomend}`);
      const resRecom = recomend.json().then((res) => setRec(res.meals));
      const magicN = 20;
      setMin(parseInt(Math.random() * (magicN - 0) + 0, 10));
      return resRecom;
    };

    getRecomend();
    getUrlDrink();
  }, [path]);

  const {
    // idDrink,
    strAlcoholic,
    strCategory,
    strInstructions,
    strDrink,
    strDrinkThumb,
    strYoutube,
  } = drinkDetail;

  const objIngred = Object.entries(drinkDetail).map((e) => {
    if (e[0].includes('strIngredient') && (e[1] !== null)) {
      return e[1];
    }
    return undefined;
  }).filter((i) => i !== undefined);

  const objMeasure = Object.entries(drinkDetail).map((e) => {
    if (e[0].includes('strMeasure') && (e[1] !== null)) {
      return e[1];
    }
    return undefined;
  }).filter((i) => i !== undefined);

  return (
    <div>
      <h3 data-testid="recipe-title">{strDrink}</h3>
      <img data-testid="recipe-photo" width="150px" src={ strDrinkThumb } alt="tumb" />
      <h4>{strCategory}</h4>
      <p data-testid="recipe-category">{strAlcoholic}</p>
      <div style={ { display: 'flex', justifyContent: 'space-around' } }>
        <ButtonFavorite objData={ drinkDetail } />
        <ButtonShare path={ window.location.href } testid="share-btn" />
      </div>
      <table>
        <tbody>
          <tr>
            <td>
              { objIngred.map((e, i) => {
                console.log(e);
                if (e !== null) {
                  return (
                    <div
                      data-testid={ `${i}-ingredient-name-and-measure` }
                      key={ i }
                    >
                      { objMeasure[i] !== (undefined || '')
                        ? `${e} - ${objMeasure[i]}` : `${e}` }
                    </div>
                  );
                }
                return undefined;
              }) }
            </td>
          </tr>
        </tbody>
      </table>
      <h6 data-testid="instructions">{strInstructions}</h6>
      { strYoutube
        && <RenderVideo
          src={ strYoutube }
          title={ `Recipe ${strDrink}` }
          id="video"
        /> }
      <div style={ { margin: '40px', paddingBottom: '60px' } }>
        <Recommended value={ rec } type="drink" min={ min } />
      </div>
      <ButtonToProgress data={ drinkDetail } />
    </div>
  );
}

export default DrinkDetailCard;
