import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --body-padding: 2rem;

    @media screen and (max-width: 600px) {
      --body-padding: 1.2rem;
    }
  }
  
  * {
    box-sizing: border-box;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Port Lligat Sans', sans-serif;
    font-weight: 400;
    font-size: 18px;
    height: 100vh;

    #__root__ {
      height: 100%;
      position: relative;
      display: grid;
      place-items: center;
    }
  }

  button {
    cursor: pointer;
    font-size: 16px;
  }

  ul {
    list-style: none;
  }
`;
