import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy'; // https://www.npmjs.com/package/clipboard-copy
import shareIcon from '../../../images/shareIcon.svg';

function DetailsShareDrinks() {
  const [copied, setCopied] = useState(false);
  const location = useLocation();

  function copyMsg() {
    return <span>Link copiado!</span>;
  }

  function shareButton() {
    setCopied(true);
    const url = location.pathname.split('/in-progress')[0];
    clipboardCopy(`http://localhost:3000${url}`);
    copyMsg();
  }

  return (
    <button
      type="button"
      data-testid="share-btn"
      onClick={ shareButton }
    >
      { copied ? copyMsg() : (<img src={ shareIcon } alt="Share" />)}
    </button>
  );
}

export default DetailsShareDrinks;
