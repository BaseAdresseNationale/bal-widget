import styled from 'styled-components'

export const StyledPartenaireCard = styled.a`
  display: flex;
  gap: 2rem;
  padding: 1rem;
  width: 100%;
  border-radius: 5px;
  border: 1px solid var(--background-action-high-blue-france);
  background-image: none;
  &:hover {
    background-color: var(--hover) !important;
  }

  &[target='_blank']::after {
    display: none;
  }

  img {
    height: 80px;
    width: 80px;
  }
`
