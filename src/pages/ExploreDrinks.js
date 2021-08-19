import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LowerMenu from '../components/LowerMenu';
import Header from '../components/Header';
import '../styles/ExploreDrinks.css';
// import GlobalContext from '../context';

export default function ExploreDrinks() {
  // const { drinkArray } = useContext(GlobalContext);
  const [randomDrinkId] = useState('178319');

  // const getRandomDrinkId = () => {
  //   const randomDrinkIndex = Math.floor(Math.random() * drinkArray.length);
  //   const drinkId = drinkArray[randomDrinkIndex];
  //   if (drinkId) setRandomDrinkId(drinkId.idDrink);
  // };

  // useEffect(getRandomDrinkId, [drinkArray]);

  return (
    <div>
      <Header title="Explorar Bebidas" renderButton />
      <div className="explore-drinks-container">
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/bebidas/ingredientes"
        >
          Por Ingredientes
        </Link>
        <Link
          data-testid="explore-surprise"
          to={ `/bebidas/${randomDrinkId}` }
        >
          Me Surpreenda!
        </Link>
      </div>
      <LowerMenu />
    </div>
  );
}
