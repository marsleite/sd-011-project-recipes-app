import React from 'react';
import { Link } from 'react-router-dom';

export default function SurpriseButton(page, randomId) {
  if (randomId > 0) {
    return (
      <Link to={ `/${page}/${randomId}` }>
        <button
          type="button"
          data-testid="explore-surprise"
          name="Me Surpreenda!"
        >
          Me Surpreenda!
        </button>
      </Link>
    );
  }
  return <span> carregando...</span>;
}
