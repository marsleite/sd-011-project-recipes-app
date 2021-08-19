import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import FooterBar from './Components/FooterBar';
// import PropTypes from 'prop-types';
import '../styles/explore.css';

function Explore() {
  const history = useHistory();
  return (
    <div className="vh-100 pb-3">
      <section className="d-flex flex-column justify-content-center container pt-3 px-3">
        <div className="header">
          <h1 data-testid="page-title">Explorar</h1>
          <img
            data-testid="profile-top-btn"
            className="profile-icon"
            src={ profileIcon }
            alt="Botão que direciona para a tela de perfil"
          />
        </div>
        {/* className="d-flex flex-column justify-content-center" */}
        <button
          type="button"
          data-testid="explore-food"
          style={ { marginTop: '170px', marginBottom: '20px' } }
          className="button align-self-center"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          className="button align-self-center"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explorar Bebidas
        </button>
      </section>
      <FooterBar />
    </div>
  );
}

export default Explore;
