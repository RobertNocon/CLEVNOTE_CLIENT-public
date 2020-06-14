import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:300,600');

  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
    color: #505050;
    /* color: white; */
  }

  body {
    /* padding-left: 150px; */
    font-size: 1.6rem;
    font-family: "Montserrat", sans-serif;
  }


  textarea:focus, input:focus, select:focus, option:focus{
    outline: none;

  }

  *:focus {
    outline: none;
    /* outline-color: white !important; */
  }








`;

export default GlobalStyle;
