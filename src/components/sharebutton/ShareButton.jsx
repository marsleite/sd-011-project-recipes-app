import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useLocation } from 'react-router';

import ShareIcon from '../../images/shareIcon.svg';

export default function ShareButton() {
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(true);

  function handleClipboardCopy() {
    copy(`http://localhost:3000${location.pathname}`);
    setIsHidden(false);
  }

  return (
    <div data-testid="share-btn">
      <button
        type="button"
        src={ ShareIcon }
        onClick={ () => handleClipboardCopy() }
      >
        <img src={ ShareIcon } alt="Botão de compartilhar" />
      </button>
      <div hidden={ isHidden }>
        <strong>Link copiado!</strong>
        <button type="button" onClick={ () => setIsHidden(true) }>x</button>
      </div>
    </div>
  );
}
