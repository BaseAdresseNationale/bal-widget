import styled from 'styled-components'

export const StyledWindow = styled.div<{ $isExpanded: boolean }>`
  position: fixed;
  z-index: 1000;
  right: 40px;
  bottom: ${({ $isExpanded }) => ($isExpanded ? '120px' : '-70vh')};
  opacity: ${({ $isExpanded }) => ($isExpanded ? 1 : 0)};
  height: 70vh;
  width: 450px;
  border-radius: 5px;
  border: 1px solid var(--background-action-high-blue-france);
  transition:
    bottom 0.3s ease-in-out,
    opacity 0.2s ease-in-out;
  background-color: white;
  display: flex;
  flex-direction: column;

  header {
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--background-action-high-blue-france);
    background-color: var(--background-action-high-blue-france);

    h1 {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 0 10px;
      color: white;
    }

    button {
      width: 45px;
      height: 45px;
    }

    .logo-wrapper {
      border-radius: 50%;
      background-color: white;
      flex-shrink: 0;
      height: 45px;
      width: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .main-container {
    overflow-y: auto;
    height: 100%;
  }
`
