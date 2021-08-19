import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Shareicon from '../images/shareIcon.svg';

function ButtonShare({ dataId }) {
  const [copied, setCopied] = useState(false);

  return (
    <div>
      <button
        type="button"
        data-testid={ dataId }
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

ButtonShare.propTypes = {
  dataId: PropTypes.string.isRequired,
};

export default ButtonShare;
