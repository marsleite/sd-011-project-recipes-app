import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCocktails, fetchRecipes, useIngredients } from '../../../hooks';
import '../../../styles/components/common/Layout.css';
import Footer from './Footer';
import Header from './Header';

function Layout({ children, title, search, noHeader, noFooter }) {
  const dispatch = useDispatch();
  const { ingredients } = useIngredients();
  useEffect(() => {
    const word = 'nome';
    const searchTerm = '';
    const defaultTitle = 'App de Receitas';
    document.title = title ? `${title} | ${defaultTitle}` : defaultTitle;
    if (title === 'Comidas' && !ingredients.length) {
      dispatch(fetchRecipes({ category: word, searchTerm }));
    }
    if (title === 'Bebidas' && !ingredients.length) {
      dispatch(fetchCocktails({ category: word, searchTerm }));
    }
  }, [dispatch, title, ingredients.length]);

  return (
    <>
      { noHeader || <Header search={ search } title={ title } />}
      { children }
      { noFooter || <Footer /> }
    </>
  );
}

export default Layout;

Layout.defaultProps = {
  title: 'Comidas',
  search: false,
  noHeader: false,
  noFooter: false,
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  noFooter: PropTypes.bool,
  title: PropTypes.string,
  search: PropTypes.bool,
  noHeader: PropTypes.bool,
};
