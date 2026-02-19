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
      span[role='heading'] {
        margin: 0;
        margin-left: 10px;
        display: inline;
        font-size: 1.25rem;
        font-weight: 500;
      }
    }

    > div {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      cursor: initial;

      .status-wrapper {
        display: flex;
        align-items: flex-end;
        font-size: 12px;
        margin: 5px 0;
      }

      p {
        font-size: 12px;
        margin: 5px 0;

        span {
          font-size: 14px;

          font-weight: 500;
        }
      }
    }
  }
`
