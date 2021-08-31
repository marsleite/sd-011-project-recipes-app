import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SurpriseButton from '../components/Explorer/SurpriseButton';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
import { getRandmomDrink } from '../services/DrinksApiServices';

export default function DrinksExplorer() {
  const pageTitle = {
    pageName: 'Explorar Bebidas',
    setIcon: false,
  };
  const [surpriseDrink, setSurpriseDrink] = useState(0);

  useEffect(() => {
    const randmomDrink = async () => {
      const fetchRandomDrink = await getRandmomDrink();
      return setSurpriseDrink(fetchRandomDrink.idDrink);
    };
    randmomDrink();
  }, []);
  const randomId = surpriseDrink;

  return (
    <div>
      <Header value={ pageTitle } />
      <div className="explorer-style-food">
        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
            name="Por Ingredientes"
          >
            Por Ingredientes
          </button>
        </Link>
        {
          SurpriseButton('bebidas', randomId)
        }
      </div>
      <FooterMenu />
    </div>
  );
}
