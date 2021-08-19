import React, { useState } from 'react';
import Shareicon from '../images/shareIcon.svg';

function Clipboard() {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          setCopied(true);
          navigator.clipboard.writeText(window.location.href);
        } }
      >
        <img src={ Shareicon } alt="Share icon" width="15px" />
      </button>
      { copied ? (<p>Link copiado!</p>) : '' }
    </div>
  );
}
export default Clipboard;
