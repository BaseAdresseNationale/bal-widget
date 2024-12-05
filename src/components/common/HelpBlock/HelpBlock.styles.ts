import styled from 'styled-components'

export const StyledHelpBlock = styled.div`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--background-action-high-blue-france);

  &:not(:last-of-type) {
    margin-bottom: 20px;
  }

  h2 {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 10px 0;
    line-height: normal;
  }
`
