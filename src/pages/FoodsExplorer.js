import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SurpriseButton from '../components/Explorer/SurpriseButton';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
import { getRandmomMeal } from '../services/MealApiService';

export default function FoodsExplorer() {
  const pageTitle = {
    pageName: 'Explorar Comidas',
    setIcon: false,
  };
  const [surpriseMeal, setSurpriseMeal] = useState(0);

  useEffect(() => {
    const setMeal = async () => {
      const random = await getRandmomMeal();
      return setSurpriseMeal(random.idMeal);
    };
    setMeal();
  }, []);
  const randomId = surpriseMeal;

  return (
    <div>
      <Header value={ pageTitle } />
      <div className="explorer-style-food">
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
            name="Por Ingredientes"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            type="button"
            data-testid="explore-by-area"
            name="Por Local de Origem"
          >
            Por Local de Origem
          </button>
        </Link>
        {
          SurpriseButton('comidas', randomId)
        }
      </div>
      <FooterMenu />
    </div>
  );
}
