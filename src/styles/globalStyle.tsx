import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
    border: 0 solid transparent;
  }

  html {
    font-size: 10px;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
  }

  button {
    &:hover {
      cursor: pointer;
    }

    &:active {
      filter: brightness(0.85);
    }

    * {
      cursor: pointer;
    }
  }
`;

export default GlobalStyle;
