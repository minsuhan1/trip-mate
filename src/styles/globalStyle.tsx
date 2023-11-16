import { createGlobalStyle } from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #75BAE0;
    --primary-color-rgb: rgba(117, 186, 224);
    --secondary-color: #D6EBF7;
    --secondary-color-lighten: #f5fbff;
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
    min-height: calc(100% + env(safe-area-inset-top));
    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
  }

  /* 모바일 수평 스크롤 금지 */
  html, body {
  max-width: 100%;
  overflow-x: hidden;
  }
  
  overflow-y: scroll;

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
    font-family: inherit;
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

  // 스크롤바 표시 숨기기
  // Chrome, Safari, Opera, Edge
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; // IE
  scrollbar-width: none; // Firefox
  
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    /* Firefox */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    /* Safari and Chrome */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    /* Opera */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default GlobalStyle;
