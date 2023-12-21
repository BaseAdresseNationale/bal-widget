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

  button {
    margin-top: 1.5rem;
  }

  .captcha-wrapper > div {
    display: flex;
    justify-content: center;
  }

  .error-message {
    color: red;
    margin: 0.5rem 0 0 0;
  }
`

export const StyledContactFormSuccess = styled.div``
