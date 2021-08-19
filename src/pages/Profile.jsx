import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/common/Footer';
import '../styles/pages/profile.css';

const Profile = () => {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const localStorageEmail = JSON.parse(localStorage.getItem('user'));
    if (localStorageEmail) {
      setUserEmail(localStorageEmail.email);
    } else {
      setUserEmail('Email não encontrado');
    }
  }, []);

  const clearLocalStorage = () => {
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('user');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
  };

  return (
    <main className="profile-page">
      <Header page="Perfil" showSearchBtn={ false } />
      <h3 className="profile-email" data-testid="profile-email">
        { userEmail }
      </h3>
      <nav className="profile-nav">
        <Link
          data-testid="profile-done-btn"
          to="/receitas-feitas"
        >
          Receitas Feitas
        </Link>
        <Link
          data-testid="profile-favorite-btn"
          to="/receitas-favoritas"
        >
          Receitas Favoritas
        </Link>
        <Link
          data-testid="profile-logout-btn"
          onClick={ () => clearLocalStorage() }
          to="/"
        >
          Sair
        </Link>
      </nav>
      <Footer />
    </main>
  );
};

export default Profile;
