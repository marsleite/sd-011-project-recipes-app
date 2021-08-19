import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import loading from '../../images/loading.gif';
import { useRecipes, useCategory, fetchCategory, fetchRecipes } from '../../hooks';

function RecipeList() {
  const { error, recipes } = useRecipes();
  const { categorys, onLoading } = useCategory();
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();
  const magicalNumberRecipes = 12;
  const magicalNumberCategory = 5;

  useEffect(() => {
    if (!recipes) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    const type = 'meals';
    dispatch(fetchCategory({ category: type }));
  }, [dispatch, recipes]);

  if (onLoading) {
    return (
      <img
        className="LOAD_SPINNER"
        src={ loading }
        alt="carregando"
        width="100px"
      />
    );
  }

  if (error) {
    return (
      <p>deu errado filhao</p>
    );
  }

  const fetchAll = ({ target }) => {
    dispatch(fetchRecipes({ category: target.value, searchTerm: '' }));
    if (target.checked) {
      setSelectedCategory(target.value);
    }
    if (!target.checked) {
      setSelectedCategory('');
      dispatch(fetchRecipes({ category: 'nome', searchTerm: '' }));
    }
  };

  const fetchCategorys = ({ target }) => {
    if (target.checked) {
      setSelectedCategory(target.value);
      const searchTerm = target.value;
      dispatch(fetchRecipes({ category: 'categorys', searchTerm }));
    } else {
      setSelectedCategory('');
      dispatch(fetchRecipes({ category: 'nome', searchTerm: '' }));
    }
  };
  return (
    <>
      <ol className="CATEGORY_LIST">
        { categorys.slice(0, magicalNumberCategory)
          .map((category, index) => (
            <li key={ category }>
              <label
                className="checkitem"
                key={ index }
                htmlFor={ `category-filter-${category.strCategory}` }
              >
                <input
                  id={ `category-filter-${category.strCategory}` }
                  data-testid={ `${category.strCategory}-category-filter` }
                  name="categorys"
                  checked={ selectedCategory === category.strCategory }
                  onChange={ fetchCategorys }
                  value={ category.strCategory }
                  type="checkbox"
                />
                {category.strCategory}
              </label>
            </li>
          ))}
        <label htmlFor="category-filter-all">
          <input
            id="category-filter-all"
            checked={ selectedCategory === 'allcategorys' }
            data-testid="All-category-filter"
            name="categorys"
            onChange={ fetchAll }
            value="allcategorys"
            type="checkbox"
          />
          All
        </label>
      </ol>
      <ol className="RECIPE_LIST">
        {recipes && recipes.slice(0, magicalNumberRecipes)
          .map((meals, index) => (
            <Link
              to={ `/comidas/${meals.idMeal}` }
              key={ meals.idMeal }
            >
              <li className="RECIPE_CARD" data-testid={ `${index}-recipe-card` }>
                <h1
                  className="title"
                  data-testid={ `${index}-card-name` }
                >
                  { meals.strMeal }
                </h1>
                <img
                  className="image"
                  alt={ `Foto de uma ${meals.strMeal}` }
                  data-testid={ `${index}-card-img` }
                  src={ meals.strMealThumb }
                />
              </li>
            </Link>))}
      </ol>
    </>
  );
}

export default RecipeList;
