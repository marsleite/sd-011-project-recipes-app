import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './RecipesFoods.css';
//import CardRecipes from '../Components/CardRecipes';
import MyContext from '../Context/MyContext';

export default function ExploreFoodOrigin() { {
  const { foodArea, setFoodArea } = useContext(MyContext);
  //const showMaxRecipes = 12;

  useEffect(() => {
    const getFoodArea = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const result = await fetch(endpoint).then((data) => data.json());
      setFoodArea(result);
      console.log(result);
    };
    getFoodArea();
  }, []);
  console.log(foodArea);
  

  return (
    <div>
      <Header className="title" title="Bebidas" searchIconAppears />
      {/* <CategoryButtons />
      <div className="cardlist">
        {drink.length > 0 && drink.map((recp, index) => (
          index < showMaxRecipes
          && (
            <Link
              className="link"
              key={ recp.idDrink }
              to={ {
                pathname: `/bebidas/${recp.idDrink}`,
              } }
            >
              <CardRecipes
                key={ index }
                index={ index }
                thumb={ recp.strDrinkThumb }
                title={ recp.strDrink }
              />
            </Link>
          )
        ))}
      </div> */}
      <Footer />
    </div>
  );
}}
