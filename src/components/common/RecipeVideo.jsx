import React from 'react';
import { string } from 'prop-types';

const RecipeVideo = ({ strYoutube }) => (
  <iframe
    data-testid="video"
    src={ (strYoutube) ? strYoutube.replace('watch?v=', 'embed/') : null }
    title="teste"
  />
);

RecipeVideo.propTypes = {
  strYoutube: string,
}.isRequired;

export default RecipeVideo;
