import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/HeaderFood';
import { getAreasFood, searchByArea, searchFoodsAll } from '../services/RequestFood';
import CardRecipe from '../components/CardRecipe';

function ExploreByOrigin() {
  const [areasArray, setAreasArray] = useState([]);
  const [filteredByArea, setFilteredByArea] = useState([]);
  const MAX_RESULT = 12;

  useEffect(() => {
    async function loadAreas() {
      const request = await getAreasFood();
      setAreasArray(request);
    }
    loadAreas();
    async function startOption() {
      const request = await searchFoodsAll();
      setFilteredByArea(request);
    }
    startOption();
  }, []);

  async function handleChange({ target }) {
    if (target.value === 'All') {
      const request = await searchFoodsAll();
      setFilteredByArea(request);
    } else {
      const request = await searchByArea(target.value);
      setFilteredByArea(request);
    }
  }

  function renderSelectArea(array) {
    return (
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ (e) => handleChange(e) }
      >
        <option data-testid="All-option" value="All" defaultValue>All</option>
        { array.map((region, index) => (
          <option
            key={ index }
            data-testid={ `${region.strArea}-option` }
            value={ region.strArea }
          >
            { region.strArea }
          </option>
        ))}
      </select>
    );
  }

  return (
    <div>
      <Header title="Explorar Origem" search />
      { renderSelectArea(areasArray) }
      { filteredByArea && filteredByArea.slice(0, MAX_RESULT).map((item, index) => (
        <CardRecipe key={ index } item={ item } index={ index } />
      )) }
      <Footer />
    </div>
  );
}

export default ExploreByOrigin;
