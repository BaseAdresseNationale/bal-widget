import React, { useEffect, useState } from 'react'
import { StyledContactForm } from '../../common/ContactForm/ContactForm.styles'
import { useMailToForm } from '../../../hooks/useMailToForm'

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
  const initialSubject = street ? subjects[0] : subjects[1]
  const [initialFormValues, setInitialFormValues] = useState(
    getInitialFormValues(initialSubject, city, street),
  )
  const { onEdit, onSubmit, mailToData } = useMailToForm(initialFormValues)

  useEffect(() => {
    setInitialFormValues(getInitialFormValues(formData.subject, city, street))
  }, [formData.subject])

  return (
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
      <button className='fr-btn fr-icon-send-plane-fill fr-btn--icon-right' type='submit'>
        Envoyer
      </button>
    </StyledContactForm>
  )
}

export default AdresseProblemForm
