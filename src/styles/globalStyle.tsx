import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #75BAE0;
    --primary-color-rgb: rgba(117, 186, 224);
    --secondary-color: #D6EBF7;
    --third-color: #E07575;
  }

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
    background: none;
    color: #000;
    &:hover {
      cursor: pointer;
    }

    * {
      cursor: pointer;
    }
  }

  input {
    border: none;
    outline: none;
  }

  ul, ol {
    list-style: none;
  }
`;

export default GlobalStyle;