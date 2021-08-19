import React from 'react';

import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';

export default function FavoriteButton() {
  return (
    <div data-testid="favorite-btn">
      <button type="button" src={ WhiteHeartIcon }>
        <img src={ WhiteHeartIcon } alt="Botão de compartilhar" />
      </button>
    </div>
  );
}
