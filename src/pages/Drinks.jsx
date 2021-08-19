import React from 'react';
import { Layout, CocktailsList } from '../components';
import '../styles/pages/Drinks.css';

function Drinks() {
  return (
    <Layout title="Bebidas" search>
      <main className="DRINKS">
        <CocktailsList />
      </main>
    </Layout>
  );
}

export default Drinks;
