import React, { useState, useEffect } from 'react';
import Shareicon from '../images/shareIcon.svg';

function Clipboard() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const seconds = 2000;
    const timeout = setTimeout(() => {
      setCopied(false);
    }, seconds);
    return () => clearTimeout(timeout);
  }, [copied]);

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
      { copied && 'Link copiado!' }
    </div>
  );
}
export default Clipboard;
