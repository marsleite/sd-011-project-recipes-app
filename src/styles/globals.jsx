import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--background-first-color);
  }

  button {
    outline: none;
    
    &:active {
      outline: none;
    }
    &:hover {
      outline: none;
    }
  }
  :root {
    --global-space: 2rem 1.8rem;
    --blue-first-color: #091444;
    --blue-second-color: #30362b;
    --background-first-color: #F1FAEE;
    --background-second-color: #091444;
    --background-third-color: #748067;
    --text-first-color: #F1FAEE;
    --font-first: 'Montserrat', sans-serif;
    --font-second: 'Montserrat Alternates', sans-serif;
    --font-third: 'Montserrat Alternates', sans-serif;
  }
`;
