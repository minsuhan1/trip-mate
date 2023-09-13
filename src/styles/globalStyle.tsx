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

  body::after{
	/* 소스만 다운받고 화면은 나태내지 않는다. (숨김 처리) */
    position:absolute; 
    width:0; 
    height:0; 
    overflow:hidden; 
    z-index:-1;
    
    /* load images */
    content: url('images/login-bg/1.jpg')
  }; /* 필요한 이미지 소스들 다운 */


  button {
    color: #000;
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
