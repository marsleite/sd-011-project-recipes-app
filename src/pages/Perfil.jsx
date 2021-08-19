import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout } from '../components';
import { useUser, updateEmail } from '../hooks';

import '../styles/pages/Perfil.css';

function Perfil() {
  const { email } = useUser();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!email) {
      try {
        const storageUser = localStorage.getItem('user');
        const parsedUser = JSON.parse(storageUser);
        dispatch(updateEmail(parsedUser.email));
      } catch (error) {
        dispatch(updateEmail(''));
      }
    }
  }, [dispatch, email]);

  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <Layout title="Perfil" noProfileLink>
      <main className="PROFILE">
        <section><p className="email" data-testid="profile-email">{ `Email: ${email} `}</p></section>
        <section className="links">
          <button
            className="button"
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/receitas-feitas') }
          >
            Receitas Feitas
          </button>
          <button
            className="button"
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/receitas-favoritas') }
          >
            Receitas Favoritas
          </button>
          <button
            className="button"
            type="button"
            data-testid="profile-logout-btn"
            onClick={ logout }
          >
            Sair
          </button>
        </section>
      </main>
    </Layout>
  );
}

export default Perfil;
