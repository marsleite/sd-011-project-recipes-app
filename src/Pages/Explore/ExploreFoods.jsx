import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import FooterBar from '../Components/FooterBar';
import '../../styles/explore.css';

function ExploreFoods() {
  const [MealId, setMealId] = React.useState();

  const history = useHistory();

  async function getRandomMealAPI() {
    const linkFoodCategory = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const awaitFood = await fetch(linkFoodCategory);
    const awaitFoodToJSON = await awaitFood.json();
    setMealId(awaitFoodToJSON.meals[0].idMeal);
  }

  React.useEffect(() => {
    getRandomMealAPI();
  }, []);

  return (
    <div>
      <section className="container pt-3 px-3">
        <div className="header">
          <h1 data-testid="page-title">Explorar Comidas</h1>
          <img
            data-testid="profile-top-btn"
            className="profile-icon"
            src={ profileIcon }
            alt="Botão que direciona para a tela de perfil"
          />
        </div>
        <div className="d-flex flex-column justify-content-center">
          <button
            type="button"
            style={ { marginTop: '120px', marginBottom: '20px' } }
            className="button"
            data-testid="explore-by-ingredient"
            onClick={ () => history.push('/explorar/comidas/ingredientes') }
          >
            Por Ingredientes
          </button>
          <button
            type="button"
            style={ { marginBottom: '20px' } }
            className="button"
            data-testid="explore-by-area"
            onClick={ () => history.push('/explorar/comidas/area') }
          >
            Por Local de Origem
          </button>
          <button
            type="button"
            className="button"
            data-testid="explore-surprise"
            onClick={ () => history.push(`/comidas/${MealId}`) }
          >
            Me Surpreenda!
          </button>
        </div>
      </section>
      <FooterBar />
    </div>
  );
}

export default ExploreFoods;
