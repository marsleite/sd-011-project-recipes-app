import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FoodOrDrinkFilter from './Components/FoodOrDrinkFilter';
import SecondShareButton from './Components/Secondary/SecondShareButton';
import '../styles/doneRecipes.css'
import FooterBar from './Components/FooterBar';

function RecipesMade() {
  const [filter, setFilter] = React.useState('all');
  const [filtereds, setFiltereds] = useState([]);
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    if (filter === 'drinks') {
      setFiltereds(doneRecipes.filter((item) => item.type === 'bebida'));
    }
    if (filter === 'foods') {
      setFiltereds(doneRecipes.filter((item) => item.type === 'comida'));
    }
    if (filter === 'all') {
      setFiltereds(doneRecipes);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  // const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  return (
    <div className="pb-5">
      <section className="container pt-3 px-3 ">
        <h1 data-testid="page-title">Receitas Feitas</h1>
      <FoodOrDrinkFilter setFilter={ setFilter } />
      {filtereds && filtereds.map(({
        id,
        image,
        name,
        area,
        alcoholicOrNot,
        category,
        doneDate,
        type,
        tags },
      index) => (
        <div className='d-flex done-cards' key={ `${name}-${id}` }>
          <div className='d-flex flex-column justify-content-between'>
          <Link to={ `/${type}s/${id}` }>
            <img
              src={ image }
              width="150"
              data-testid={ `${index}-horizontal-image` }
              alt="Imagem de comida"
            />
          </Link>
          <SecondShareButton
              itemId={ id }
              type={ type }
              testID={ `${index}-horizontal-share-btn` }
            /> 
            </div>
          <div className="d-flex flex-wrap done-description">
            <p
            style={{fontWeight: 'bold'}} data-testid={ `${index}-horizontal-top-text` }>
              {area !== '' ? `${area} - ${category}` : alcoholicOrNot }
            </p>
            <Link to={ `/${type}s/${id}` }>
              <p className="a-p" data-testid={ `${index}-horizontal-name` }>{name}</p>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>
              {doneDate}
            </p>
            <div style={{height: '70px'}}>
            { tags.map((data) => (
              <p
              style={{fontWeight: 'bold'}}
                key={ index }
                data-testid={ `${index}-${data}-horizontal-tag` }
              >
                {data}
              </p>))}    
              </ div>
              
          </div>
        </div>
      ))}
      </section>
<FooterBar />
    </div>
  );
}

export default RecipesMade;
