import styled from 'styled-components'

export const StyledSondageForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .question {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .question-label {
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0;
  }

  .stars {
    display: flex;
    gap: 6px;
  }

  .star-btn {
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    color: var(--text-disabled-grey, #929292);
    font-size: 1.6rem;
    line-height: 1;
    transition: color 0.15s ease-in-out;

    &.is-filled {
      color: var(--background-action-high-blue-france, #000091);
    }

    /* Aper\u00e7u au survol : opacit\u00e9 r\u00e9duite pour distinguer du choix valid\u00e9 */
    &.is-preview {
      color: var(--background-action-high-blue-france, #000091);
      opacity: 0.7;
    }

    &:focus-visible {
      outline: 2px solid var(--background-action-high-blue-france, #000091);
      outline-offset: 2px;
      border-radius: 2px;
    }
  }

  .submit-row {
    display: flex;
    justify-content: flex-end;
  }
`
