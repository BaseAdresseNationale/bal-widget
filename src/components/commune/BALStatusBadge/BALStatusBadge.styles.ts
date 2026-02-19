import styled from 'styled-components'
import Button from '@codegouvfr/react-dsfr/Button'

export const StyledBALStatusBadge = styled(Button)<{
  $color: string
  $background: string
}>`
  position: relative;
  display: flex;
  margin-left: 10px;
  background-color: ${(props) => props.$background};
  color: ${(props) => props.$color};
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  width: fit-content;
  text-align: center;

  &:hover {
    background-color: ${(props) => props.$background} !important;
  }
`
