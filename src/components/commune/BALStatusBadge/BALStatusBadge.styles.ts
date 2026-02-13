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
  padding: 2px 5px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  width: fit-content;
  min-width: 100px;
  text-align: center;
`
