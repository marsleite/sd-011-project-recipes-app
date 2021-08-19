import React from 'react';

import ShareIcon from '../../images/shareIcon.svg';

export default function ShareButton() {
  return (
    <div data-testid="share-btn">
      <button type="button" src={ ShareIcon }>
        <img src={ ShareIcon } alt="Botão de compartilhar" />
      </button>
    </div>
  );
}
