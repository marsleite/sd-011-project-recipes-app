import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../Context_Configs/Context';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './Components/SearchBar';
import FooterBar from './Components/FooterBar';
import FoodCategory from './Components/FoodCategory';
import FoodsCards from './Components/FoodsCards';
import FoodCategoryCards from './Components/FoodCategoryCards';

// import PropTypes from 'prop-types';

function Foods() {
  const history = useHistory();
  const { dataFood,
    setRequestFoodParams,
    renderFoodCategory,
    // setRenderFoodCategory,
    requestFoodParams,
  } = useContext(Context);
  const [showSearch, setShowSearch] = useState(false);
  // const [foodCategories, setFoodCategories] = useState();
  // const [foodFilter, setFoodFilter] = useState([]);
  const foods = 'foods';

  // Busca por comidas ao renderizar a tela de comidas.
  useEffect(() => {
    if (requestFoodParams.searchInput === '' && requestFoodParams.searchMethod === '') {
      setRequestFoodParams({
        searchInput: '', searchMethod: '' });
    } else {
      // setRequestFoodParams({
      //   searchInput: requestFoodParams.searchInput,
      //   searchMethod: requestFoodParams.searchMethod });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderFoodCategory]);

  if (dataFood !== null && dataFood.length === 1) {
    const oneResult = dataFood[0];
    history.push(`/comidas/${oneResult.idMeal}`);
  }

  return (
    <>
      <div>
        <h1 data-testid="page-title">Comidas</h1>
        { showSearch && <SearchBar value={ foods } /> }
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Botão que direciona para a tela de perfil"
          />
        </Link>
        <button
          onClick={ () => setShowSearch(!showSearch) }
          type="button"
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Botão com imagem de uma lupa: abre uma barra de pesquisa"
          />
        </button>
      </div>
      <FoodCategory />
      {
        renderFoodCategory ? <FoodsCards /> : <FoodCategoryCards />
      }
      <FooterBar />
    </>
  );
}

export default Foods;

Foods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
