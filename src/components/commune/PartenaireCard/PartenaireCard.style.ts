import styled from 'styled-components'

export const StyledPartenaireCard = styled.div`
  position: relative;
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

  a::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    mask-image: none;
    background-color: transparent;
  }
`
