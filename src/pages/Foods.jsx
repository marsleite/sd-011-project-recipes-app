import React from 'react';
import { Layout, RecipeList } from '../components';
import '../styles/pages/Foods.css';

function Foods() {
  return (
    <Layout title="Comidas" search>
      <main className="FOODS">
        <RecipeList />
      </main>
    </Layout>
  );
}

export default Foods;
