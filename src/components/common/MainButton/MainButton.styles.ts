import styled, { css, keyframes } from 'styled-components'

// Pulse d'anneau interne : reste entièrement dans les 60x60 du bouton
// (l'iframe étant collée aux dimensions du bouton, tout débordement est clippé).
const pulse = keyframes`
  0% {
    box-shadow:
      inset 0 0 0 0 rgba(255, 255, 255, 0.9),
      inset 0 0 0 0 rgba(255, 255, 255, 0.6);
  }
  60% {
    box-shadow:
      inset 0 0 0 4px rgba(255, 255, 255, 0),
      inset 0 0 0 10px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow:
      inset 0 0 0 6px rgba(255, 255, 255, 0),
      inset 0 0 0 14px rgba(255, 255, 255, 0);
  }
`

export const StyledMainButton = styled.button<{ $isWizzing?: boolean }>`
  position: fixed;
  z-index: 999;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px !important;
  width: 60px !important;
  &::before {
    margin: 0 !important;
  }
  ${({ $isWizzing }) =>
    $isWizzing &&
    css`
      animation: ${pulse} 1s ease-out 1;
    `}
`
