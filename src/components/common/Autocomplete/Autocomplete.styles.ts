import styled from 'styled-components'

export const StyledAutocomplete = styled.div`
  position: relative;
  .results {
    position: absolute;
    background-color: #fff;
    width: 100%;
    border: 1px solid #ccc;
    border-top: none;
    z-index: 100;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 0 0 4px 4px;

    > div {
      > button {
        width: 100%;
        text-align: left;
        padding: 5px 10px;
        cursor: pointer;
        &:hover {
          background-color: #eee;
        }
      }
    }

    > p {
      padding: 5px 10px;
      margin: 0;
    }
  }
`
