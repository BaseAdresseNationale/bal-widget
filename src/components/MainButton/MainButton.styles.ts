import styled from 'styled-components'

export const StyledMainButton = styled.button`
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
`
