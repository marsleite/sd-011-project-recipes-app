import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LowerMenu from '../components/LowerMenu';
import Header from '../components/Header';
import '../styles/ExploreMeals.css';
// import GlobalContext from '../context';

export default function ExploreMeals() {
  // const { foodArray } = useContext(GlobalContext);
  const [randomMealId] = useState('52771');

  // const getRandomMealId = () => {
  //   const randomMealIndex = Math.floor(Math.random() * foodArray.length);
  //   const mealId = foodArray[randomMealIndex];
  //   if (mealId) setRandomMealId(mealId.idMeal);
  // };

  // useEffect(getRandomMealId, [foodArray]);

  return (
    <div>
      <Header title="Explorar Comidas" renderButton />
      <div className="explore-meals-container">
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/comidas/ingredientes"
        >
          Por Ingredientes
        </Link>
        <Link
          data-testid="explore-by-area"
          to="/explorar/comidas/area"
        >
          Por Local de Origem
        </Link>
        <Link
          data-testid="explore-surprise"
          to={ `/comidas/${randomMealId}` }
        >
          Me Surpreenda!
        </Link>
      </div>
      <LowerMenu />
    </div>
  );
}
