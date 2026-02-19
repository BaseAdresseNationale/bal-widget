import styled from 'styled-components'

export const StyledBALStatusBadge = styled.span<{
  $color: string
  $content: string
  $background: string
}>`
  position: relative;
  display: inline-block;
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

  &:hover {
    &:after {
      position: absolute;
      padding: 5px;
      bottom: calc(100% + 5px);
      transform: translateX(-50%);
      left: 50%;
      background-color: black;
      opacity: 0.8;
      width: 200px;
      color: white;
      content: '${(props) => props.$content}';
      font-weight: normal;
      text-transform: none;
      border-radius: 4px;
      line-height: 1.5;
    }
  }
`
