import React from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { StyledContactForm, StyledContactFormSuccess } from './ContactForm.styles'
import { EmailSentStatus, useContactForm } from '../../../hooks/useContactForm'
import { useBALAdmin } from '../../../hooks/useBALAdmin'

interface ContactFormProps {
  subjects: string[]
}

function ContactForm({ subjects }: ContactFormProps) {
  const { sendMail } = useBALAdmin()
  const { emailStatus, canSubmit, onEdit, onSubmit } = useContactForm(
    {
      email: '',
      firstName: '',
      lastName: '',
      subject: '',
      message: '',
      captchaToken: '',
    },
    sendMail,
  )

  return emailStatus === EmailSentStatus.SENT ? (
    <StyledContactFormSuccess>
      <h2>Votre message a bien été envoyé</h2>
      <p>Nous vous répondrons dans les plus brefs délais.</p>
    </StyledContactFormSuccess>
  ) : (
    <StyledContactForm onSubmit={onSubmit}>
      <div className='input-wrapper fr-grid-row'>
        <div className='fr-col-6' style={{ paddingRight: 10 }}>
          <label className='fr-label' htmlFor='firstName'>
            Prénom
          </label>
          <input
            onChange={(e) => onEdit('firstName')(e.target.value)}
            className='fr-input'
            type='firstName'
            name='firstName'
          ></input>
        </div>
        <div className='fr-col-6'>
          <label className='fr-label' htmlFor='lastName'>
            Nom
          </label>
          <input
            onChange={(e) => onEdit('lastName')(e.target.value)}
            className='fr-input'
            type='lastName'
            name='lastName'
          ></input>
        </div>
      </div>
      <div className='input-wrapper'>
        <label className='fr-label' htmlFor='email'>
          Votre adresse e-mail*
        </label>
        <input
          onChange={(e) => onEdit('email')(e.target.value)}
          required
          className='fr-input'
          type='email'
          name='email'
        ></input>
      </div>
      <div className='fr-select-group'>
        <label className='fr-label' htmlFor='subject'>
          Sujet de votre message*
        </label>
        <select
          onChange={(e) => onEdit('subject')(e.target.value)}
          defaultValue=''
          required
          className='fr-select'
          name='subject'
        >
          <option value='' disabled hidden>
            Selectionnez une option
          </option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <div className='input-wrapper'>
        <label className='fr-label' htmlFor='message'>
          Votre message*
        </label>
        <textarea
          onChange={(e) => onEdit('message')(e.target.value)}
          required
          className='fr-input'
          rows={10}
          name='message'
        />
      </div>
      <div className='captcha-wrapper'>
        <HCaptcha
          sitekey={process.env.REACT_APP_HCAPTCHA_SITE_KEY || ''}
          onVerify={(token) => onEdit('captchaToken')(token)}
        />
      </div>
      {emailStatus === EmailSentStatus.ERROR && (
        <p className='error-message'>Une erreur est survenue, veuillez réessayer plus tard.</p>
      )}
      <button
        disabled={!canSubmit || emailStatus === EmailSentStatus.SENDING}
        className='fr-btn fr-icon-send-plane-fill fr-btn--icon-right'
        type='submit'
      >
        Envoyer
      </button>
    </StyledContactForm>
  )
}

export default ContactForm
