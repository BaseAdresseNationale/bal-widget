import styled from 'styled-components'

export const StyledCommuneInfosMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  details {
    user-select: none;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    width: 100%;
    summary {
      margin: 0;
      padding: 0;
      cursor: pointer;
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

      div {
        font-size: 12px;
      }
    }
  }
`
