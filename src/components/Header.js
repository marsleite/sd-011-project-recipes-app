import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import chef from '../images/chef1.png';
import './css/Header.css';
import SearchBar from './SearchBar';
import search from '../images/search.png';
import 'animate.css';

import {
  Button,
} from './styles/FooterAndHeader';

function Header({ props: { title, enableSearchButton, enableProfileButton } }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  let classN = 'header';
  if (title === '') classN = 'header1';
  return (
    <div className="header-container">
      <header className={ classN }>
        {enableProfileButton
          && (
            <Link to="/perfil">
              <Button
                small
                type="button"
                data-testid="profile-top-btn"
                id="profileIcon"
                src={ chef }
              >
                <img src={ chef } alt="profile" />
              </Button>
            </Link>)}

        <h1
          className="animate__animated animate__swing"
          data-testid="page-title"
        >
          {title}
        </h1>

        {enableSearchButton
          && (
            <Button
              small
              type="button"
              data-testid="search-top-btn"
              src={ search }
              onClick={ () => setShowSearchBar(!showSearchBar) }
            >
              <img src={ search } alt="Lens" />
            </Button>)}
        {showSearchBar && (<SearchBar title={ title } />)}
      </header>
    </div>
  );
}

export default Header;

Header.propTypes = {
  props: PropTypes.shape({
    title: PropTypes.string,
    enableSearchButton: PropTypes.bool,
    enableProfileButton: PropTypes.bool,
  }).isRequired,
};
