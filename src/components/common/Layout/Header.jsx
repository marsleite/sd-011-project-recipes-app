import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchForm from '../../Home/SearchForm';
import ProfileIcon from '../../../images/profileIcon.svg';
import SearchIcon from '../../../images/searchIcon.svg';

function Header({ search, title }) {
  const [showInput, setShowInput] = useState(false);

  const handleShowSeachInput = () => (
    showInput ? setShowInput(false) : setShowInput(true)
  );

  const handleTypeRequisition = () => (title === 'Comidas' ? 'meals' : 'drinks');

  return (
    <header className="HEADER">
      <Link to="/perfil">
        <img
          className="icon"
          data-testid="profile-top-btn"
          alt="Ver meu perfil"
          src={ ProfileIcon }
        />
      </Link>
      <h1 className="title" data-testid="page-title">{ title }</h1>
      { search
            && (
              <button
                type="button"
                onClick={ () => handleShowSeachInput() }
              >
                <img
                  className="icon"
                  data-testid="search-top-btn"
                  alt="Buscar receitas"
                  src={ SearchIcon }
                />
              </button>
            )}
      {showInput && <SearchForm type={ handleTypeRequisition() } />}

    </header>
  );
}

Header.defaultProps = {
  search: false,
  title: 'Comidas',
};

Header.propTypes = {
  search: PropTypes.bool,
  title: PropTypes.string,
};

export default Header;
