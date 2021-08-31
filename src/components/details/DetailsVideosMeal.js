import React, { useContext } from 'react';
import ReactPlayer from 'react-player'; // https://www.npmjs.com/package/react-player
import RecipesContext from '../../context/RecipesContext';

function DetailsVideosMeal() {
  const { mealId } = useContext(RecipesContext);
  return (
    <ReactPlayer
      url={ mealId.strYoutube }
      data-testid="video"
      width="100%"
      height="200px"
    />
  );
}

export default DetailsVideosMeal;
