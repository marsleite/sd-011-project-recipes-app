/* eslint-disable no-alert */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import './header.css';

const Header = ({
  page,
  showSearchBtn,
  recipe,
  recipeId,
  redirectTo,
  dispatch,
  fetchIngredients,
  fetchByName,
  fetchByFirstLetter,
}) => {
  const [showField, setShowField] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState('');
  const [typeIngredient, setTypeIngredient] = useState('');

  const requestSearch = () => {
    if (selectedRadio === 'ingrediente') {
      dispatch(fetchIngredients(typeIngredient));
    }
    if (selectedRadio === 'name') {
      dispatch(fetchByName(typeIngredient));
    }
    if (selectedRadio === 'first-letter') {
      if (typeIngredient.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        dispatch(fetchByFirstLetter(typeIngredient));
      }
    }
  };

  if (selectedRadio && recipe.length === 1) {
    return <Redirect to={ `/${redirectTo}/${recipeId}` } />;
  }

  return (
    <>
      <header className="header-style">
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="profile icon"
            data-testid="profile-top-btn"
          />
        </Link>
        <h3 data-testid="page-title">{page}</h3>
        {
          (showSearchBtn)
            ? (
              <button
                type="button"
                onClick={ () => setShowField((show) => !show) }
              >
                <img
                  src={ searchIcon }
                  alt="research magnifying glass"
                  data-testid="search-top-btn"
                />
              </button>) : null
        }
      </header>
      {
        (showField)
          ? (
            <span className="field-style">
              <input
                type="text"
                data-testid="search-input"
                onChange={ ({ target: { value } }) => setTypeIngredient(value) }
              />
              <div className="buttons">
                <label htmlFor="ingrediente">
                  Ingrediente
                  <input
                    type="radio"
                    data-testid="ingredient-search-radio"
                    id="ingrediente"
                    name="selector"
                    value="ingrediente"
                    onClick={ ({ target: { value } }) => setSelectedRadio(value) }
                  />
                </label>

                <label htmlFor="nome">
                  Nome
                  <input
                    type="radio"
                    data-testid="name-search-radio"
                    id="nome"
                    name="selector"
                    value="name"
                    onClick={ ({ target: { value } }) => setSelectedRadio(value) }
                  />
                </label>

                <label htmlFor="letra">
                  Primeira letra
                  <input
                    type="radio"
                    data-testid="first-letter-search-radio"
                    id="letra"
                    name="selector"
                    value="first-letter"
                    onClick={ ({ target: { value } }) => setSelectedRadio(value) }
                  />
                </label>
              </div>
              <button
                type="button"
                data-testid="exec-search-btn"
                onClick={ () => requestSearch() }
              >
                Buscar
              </button>
            </span>
          )
          : null
      }
    </>
  );
};

Header.propTypes = ({
  page: PropTypes.string,
  showSearchBtn: PropTypes.bool,
  radioOption: PropTypes.bool,
  sendRadioInfo: PropTypes.func,
  typedIngredient: PropTypes.string,
}).isRequired;

export default connect()(Header);
