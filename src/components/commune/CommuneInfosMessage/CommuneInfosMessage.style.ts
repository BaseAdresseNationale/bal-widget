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
      div {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: calc(100% - 24px);
        h3 {
          margin: 0;
          margin-left: 10px;
          display: inline;
          font-size: 1.25rem;
        }
      }
    }

    > div {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      cursor: initial;

      p {
        font-size: 12px;
        margin: 0;
      }
    }
  }
`
