import styled from 'styled-components'

export const StyledDocAdresseTopArticles = styled.div`
  .links-wrapper {
    button {
      display: block;
      margin-bottom: 10px;
    }
  }

  .ais-Hits {
    margin-top: 8px;

    .ais-Hits-list {
      list-style: none;
      padding: 0;
      margin: 0;
      max-height: 300px;
      overflow-y: auto;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: #fff;
    }

    .ais-Hits-item {
      padding: 0;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .hit-item {
    display: block;
    width: 100%;
    padding: 10px 12px;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    font-size: 0.875rem;
    color: var(--text-action-high-blue-france, #000091);
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--background-alt-blue-france, #f5f5fe);
    }

    .hit-title {
      font-weight: 500;
    }
  }
`
