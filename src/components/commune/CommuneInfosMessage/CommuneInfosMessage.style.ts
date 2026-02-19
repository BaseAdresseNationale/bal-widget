import styled from 'styled-components'

export const StyledCommuneInfosMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  details {
    margin: 5px 0;
    user-select: none;
    padding: 10px;
    background-color: #fff;
    border: 1px solid var(--background-action-high-blue-france);
    width: 100%;
    summary {
      margin: 0;
      padding: 0;
      outline: none;
      font-weight: bold;

      &:focus {
        outline: none;
      }
    }

    > div {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      cursor: initial;

      div {
        font-size: 12px;
      }
    }
  }
`
