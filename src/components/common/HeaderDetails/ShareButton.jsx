import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../../images/shareIcon.svg';

const ShareButton = ({ removeUrl }) => {
  const [menssage, setMenssage] = useState(null);

  const handleClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href.split(`${removeUrl}`)[0]);
    setMenssage('Link copiado!');
    const time = 3000;
    setTimeout(() => {
      setMenssage(null);
    }, time);
  };
  return (
    <>
      <button
        type="button"
        onClick={ () => handleClipboard() }
      >
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="Icon to share foods"
        />
      </button>
      <span>{menssage}</span>
    </>
  );
};

ShareButton.propTypes = {
  removeUrl: PropTypes.string,
};

ShareButton.defaultProps = {
  removeUrl: undefined,
};

export default ShareButton;
