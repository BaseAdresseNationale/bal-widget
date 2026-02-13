import styled from 'styled-components'

export const StyledContactForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  *:not(button) {
    width: 100%;
  }

  .input-wrapper {
    margin-bottom: 1.5rem;
  }

  button[type='submit'] {
    margin-top: 1.5rem;
  }

  .error-message {
    color: red;
    margin: 0.5rem 0 0 0;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  legend {
    font-size: 0.875rem;
  }
`
