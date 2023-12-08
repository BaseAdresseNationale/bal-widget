import React, { useMemo, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { StyledContactForm, StyledContactFormSuccess } from './ContactForm.styles'
import { useBALAdmin } from '../../hooks/useBALAdmin'

const RE_CAPTCHA_SITE_KEY = process.env.REACT_APP_RE_CAPTCHA_SITE_KEY || ''

enum EmailSentStatus {
  NOT_SENT = 'NOT_SENT',
  SENT = 'SENT',
  SENDING = 'SENDING',
  ERROR = 'ERROR',
}

export interface EmailData {
  firstName?: string
  lastName?: string
  email: string
  subject: string
  message: string
  reCaptchaToken: string
}

interface ContactFormProps {
  subjects: string[]
}

function ContactForm({ subjects }: ContactFormProps) {
  const { sendMail } = useBALAdmin()
  const [emailStatus, setEmailStatus] = useState<EmailSentStatus>(EmailSentStatus.NOT_SENT)
  const [formData, setFormData] = useState<EmailData>({
    email: '',
    subject: '',
    message: '',
    reCaptchaToken: '',
  })

  const isFormValid = useMemo(() => {
    return Object.keys(formData).every((key) => formData[key as keyof EmailData] !== '')
  }, [formData])

  const onEdit = (key: keyof EmailData) => (value: string | null) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setEmailStatus(EmailSentStatus.SENDING)
      await sendMail(formData)
      setEmailStatus(EmailSentStatus.SENT)
    } catch (error) {
      console.log(error)
      setEmailStatus(EmailSentStatus.ERROR)
    }
  }

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
            required
            className='fr-input'
            type='firstName'
            name='firstName'
          ></input>
        </div>
        <div className='fr-col-6'>
          <label className='fr-label' htmlFor='firstName'>
            Nom
          </label>
          <input
            onChange={(e) => onEdit('firstName')(e.target.value)}
            required
            className='fr-input'
            type='firstName'
            name='firstName'
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
      <ReCAPTCHA
        className='re-captcha'
        sitekey={RE_CAPTCHA_SITE_KEY}
        onChange={onEdit('reCaptchaToken')}
      />
      {emailStatus === EmailSentStatus.ERROR && (
        <p className='error-message'>Une erreur est survenue, veuillez réessayer plus tard.</p>
      )}
      <button
        disabled={!isFormValid || emailStatus === EmailSentStatus.SENDING}
        className='fr-btn fr-icon-send-plane-fill fr-btn--icon-right'
        type='submit'
      >
        Envoyer
      </button>
    </StyledContactForm>
  )
}

export default ContactForm
