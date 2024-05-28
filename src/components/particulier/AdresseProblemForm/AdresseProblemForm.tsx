import React, { useEffect, useState } from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import {
  StyledContactForm,
  StyledContactFormSuccess,
} from '../../common/ContactForm/ContactForm.styles'
import { EmailSentStatus, useContactForm } from '../../../hooks/useContactForm'
import { useBALAdmin } from '../../../hooks/useBALAdmin'

const HCAPTCHA_SITE_KEY = process.env.REACT_APP_HCAPTCHA_SITE_KEY || ''

interface AdresseProblemFormProps {
  city: { name: string; code: string }
  street?: string
}

const subjects = ['Adresse non répertoriée', 'Voie non répertoriée', 'Autre']

const getInitialFormValues = (
  subject: string,
  city: { name: string; code: string },
  street?: string,
) => {
  const baseValues = {
    email: '',
    firstName: '',
    lastName: '',
    city: city.code,
    subject,
    message: '',
    captchaToken: '',
    street: undefined,
    number: undefined,
  }
  if (subject === subjects[2]) {
    return baseValues
  } else if (subject === subjects[1]) {
    return {
      ...baseValues,
      street,
    }
  } else {
    return {
      ...baseValues,
      street,
      number: '',
    }
  }
}

function AdresseProblemForm({ city, street }: AdresseProblemFormProps) {
  const { sendMailToCommune } = useBALAdmin()
  const initialSubject = street ? subjects[0] : subjects[1]
  const [initialFormValues, setInitialFormValues] = useState(
    getInitialFormValues(initialSubject, city, street),
  )
  const { emailStatus, canSubmit, onEdit, onSubmit, formData } = useContactForm(
    initialFormValues,
    sendMailToCommune,
  )

  useEffect(() => {
    setInitialFormValues(getInitialFormValues(formData.subject, city, street))
  }, [formData.subject])

  return emailStatus === EmailSentStatus.SENT ? (
    <StyledContactFormSuccess>
      <h2>Votre signalement a bien été envoyé à la commune</h2>
      <p>
        Nous lui avons transmis vos coordonnées pour qu&apos;elle puisse revenir vers vous et vous
        tenir informé de la prise en compte de ce signalement.
      </p>
    </StyledContactFormSuccess>
  ) : (
    <StyledContactForm onSubmit={onSubmit}>
      <h2>Signalement</h2>
      <div className='fr-select-group'>
        <label className='fr-label' htmlFor='subject'>
          Objet du signalement*
        </label>
        <select
          onChange={(e) => onEdit('subject')(e.target.value)}
          defaultValue={initialFormValues.subject}
          required
          className='fr-select'
          name='subject'
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <div className='input-wrapper'>
        <label className='fr-label' htmlFor='city'>
          Commune*
        </label>
        <input
          required
          defaultValue={city.name}
          disabled
          className='fr-input'
          type='text'
          name='city'
        />
      </div>
      {formData.subject !== subjects[2] && (
        <div className='input-wrapper'>
          <label className='fr-label' htmlFor='street'>
            Voie*
          </label>
          <input
            onChange={(e) => onEdit('street')(e.target.value)}
            required
            defaultValue={street}
            className='fr-input'
            type='text'
            name='street'
            {...(formData.subject === subjects[1] ? { disabled: false } : { disabled: true })}
          />
        </div>
      )}
      {formData.subject === subjects[0] && (
        <div className='input-wrapper'>
          <label className='fr-label' htmlFor='number'>
            Adresse manquante*
          </label>
          <input
            onChange={(e) => onEdit('number')(e.target.value)}
            required
            className='fr-input'
            type='text'
            name='number'
          />
        </div>
      )}
      <div className='input-wrapper'>
        <label className='fr-label' htmlFor='message'>
          Informations complémentaires{formData.subject === subjects[2] && '*'}
        </label>
        <textarea
          onChange={(e) => onEdit('message')(e.target.value)}
          className='fr-input'
          rows={5}
          name='message'
          {...(formData.subject === subjects[2] ? { required: true } : { required: false })}
        />
      </div>
      <h2>Contact</h2>
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
          />
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
        />
      </div>
      <div className='captcha-wrapper'>
        <HCaptcha sitekey={HCAPTCHA_SITE_KEY} onVerify={(token) => onEdit('captchaToken')(token)} />
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

export default AdresseProblemForm
