import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LowerMenu from '../components/LowerMenu';
import Header from '../components/Header';
import '../styles/Profile.css';

export default function Profile() {
  const [email] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')).email;
    } catch (error) {
      return '';
    }
  });

  return (
    <>
      <Header title="Perfil" renderButton />
      <div className="user-info">
        <h4>Usuário:</h4>
        <p data-testid="profile-email">{email}</p>
      </div>
      <div className="links-container">
        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>

        <Link to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>

        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => localStorage.clear() }
          >
            Sair
          </button>
        </Link>
      </div>
      <LowerMenu />
    </>
  );
}
