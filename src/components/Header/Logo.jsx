import React from 'react';
import PropTypes from 'prop-types';
import { LogoContainer } from './styles';

import logoSrc from '../../images/logo.svg';

function Logo() {
  return (
    <LogoContainer>
      <img src={ logoSrc } alt="letmeEat" />
    </LogoContainer>
  );
}

export default Logo;

Logo.propTypes = {
  logoSrc: PropTypes.string.isRequired,
};
