import { createGlobalStyle } from "styled-components";

export const GlobalStyling = createGlobalStyle`

*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

body{
    min-height: 100vh;
    width: 100%;
    /* background: linear-gradient(to top right, #6600cc 0%, #0000cc 55%); */
    background: linear-gradient(to top right, #4700cc 0%, #0058db 100%);
    color: white;
    font-family: 'Raleway', sans-serif;
}

h1, h2{
    font-weight: lighter;

}

h1{
    font-size: 2.25rem
}
h2{
    font-size: 1.75rem
}
`;
