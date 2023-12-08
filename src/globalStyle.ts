import { createGlobalStyle } from 'styled-components'

// Global styles to override DSFR styles

const GlobalStyle = createGlobalStyle`
 .fr-btn[class*=" fr-fi-"]:not([class*=fr-btn--icon-]), .fr-btn[class*=" fr-icon-"]:not([class*=fr-btn--icon-]), .fr-btn[class^=fr-fi-]:not([class*=fr-btn--icon-]), .fr-btn[class^=fr-icon-]:not([class*=fr-btn--icon-]) {
    max-height: unset;
    max-width: unset;
 }
 `

export default GlobalStyle
