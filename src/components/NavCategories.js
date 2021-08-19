import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { searchByCategoryDrink } from '../services/RequestDrinks';
import { searchByCategoryFood } from '../services/RequestFood';
import { RequestHook } from '../Context/RequestHook';

function NavCategories({ origin }) {
  const [clickedButton, setClickedButton] = useState('');
  const [category, setCategory] = useState([]);
  const { setFiltered, setByCategory } = RequestHook();

  async function searchByCategory(text) {
    let items;
    if (origin === 'Food') {
      if (text === 'All') {
        return;
      }
      items = await searchByCategoryFood(text);
    } else if (origin === 'Drink') {
      if (text === 'All') {
        return;
      }
      items = await searchByCategoryDrink(text);
    }
    setFiltered(items);
  }

  function handleClick({ value }) {
    if (value === 'All') {
      setClickedButton('');
    }
    if (clickedButton === '' && value !== 'All') {
      setClickedButton(value);
      setByCategory((state) => !state);
      searchByCategory(value);
    } else if (clickedButton !== value && value !== 'All') {
      setClickedButton(value);
      searchByCategory(value);
    } else {
      setByCategory((state) => !state);
    }
  }

  useEffect(() => {
    function loadCategories() {
      let array;
      if (origin === 'Food') {
        array = ['All', 'Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
      } else if (origin === 'Drink') {
        array = ['All', 'Ordinary Drink', 'Cocktail',
          'Milk / Float / Shake', 'Other/Unknown', 'Cocoa'];
      }
      setCategory(array);
    }
    loadCategories();
  }, []);

  return (
    <div>
      { category.map((item, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${item}-category-filter` }
          value={ item }
          onClick={ (e) => handleClick(e.target) }
        >
          { item }
        </button>
      )) }
    </div>
  );
}

NavCategories.propTypes = {
  origin: PropTypes.string.isRequired,
};

export default NavCategories;
