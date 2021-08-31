import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ value }) {
  const history = useHistory();
  const { pageName, setIcon } = value;
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => () => {
    setShowSearchBar(false);
  }, [setShowSearchBar]);

  function isVerified() {
    if (showSearchBar === false) {
      return setShowSearchBar(true);
    }
    return setShowSearchBar(false);
  }

  function hiddenInput() {
    if (showSearchBar) {
      return (
        <SearchBar />
      );
    }
  }
  function handleButton() {
    if (setIcon) {
      return (
        <div>
          <button
            className="button-header"
            type="button"
            onClick={ isVerified }
          >
            <img data-testid="search-top-btn" src={ searchIcon } alt="buscar" />
          </button>
        </div>
      );
    }
  }
  return (
    <header className="container-header">
      <div className="header-wrapper">
        <button
          className="button-header"
          type="button"
          onClick={ () => history.push('/perfil') }
        >
          <img
            data-testid="profile-top-btn"
            alt="User"
            src={ profileIcon }
          />
        </button>
        { handleButton() }
      </div>
      { hiddenInput() }
      <h3 data-testid="page-title">{ pageName }</h3>
    </header>
  );
}

Header.propTypes = {
  value: PropTypes.shape({
    pageName: PropTypes.string,
    setIcon: PropTypes.bool,
  }).isRequired,
};

export default Header;
