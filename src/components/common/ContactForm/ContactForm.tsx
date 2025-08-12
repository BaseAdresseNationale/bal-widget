import React from 'react'
import { StyledContactForm } from './ContactForm.styles'
import { useMailToForm } from '../../../hooks/useMailToForm'
import Autocomplete from '../Autocomplete/Autocomplete'
import { fetchCommunes } from '../../../lib/api-geo'
import { APIGeoCommune } from '../../../types/APIGeo.types'

interface ContactFormProps {
  subjects: string[]
}

interface FormData {
  firstName: string
  lastName: string
  commune: string
  message: string
}

const getBody = ({ firstName, lastName, commune, message }: FormData) => {
  return `Message généré par BAL-Widget via le formulaire de contact pour les communes.\n\nCorespondant:\nNom: ${lastName}\nPrénom: ${firstName}\nCommune: ${commune}\n\nMessage:\n${message}`
}

function ContactForm({ subjects }: ContactFormProps) {
  const {
    onEdit,
    onSubmit,
    mailToData: { bodyData, subject },
  } = useMailToForm(
    {
      to: 'adresse@data.gouv.fr',
      subject: '',
      bodyData: {
        firstName: '',
        lastName: '',
        commune: '',
        message: '',
      },
    },
    getBody,
  )

  const isSubmitDisabled = !bodyData.commune || !subject || !bodyData.message

  return (
    <StyledContactForm onSubmit={onSubmit}>
      <div className='input-wrapper fr-grid-row'>
        <div className='fr-col-6' style={{ paddingRight: 10 }}>
          <label className='fr-label' htmlFor='firstName'>
            Prénom
          </label>
          <input
            onChange={(e) => onEdit('bodyData')({ ...bodyData, firstName: e.target.value })}
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
            onChange={(e) => onEdit('bodyData')({ ...bodyData, lastName: e.target.value })}
            className='fr-input'
            type='lastName'
            name='lastName'
          ></input>
        </div>
      </div>
      <div className='input-wrapper'>
        <label className='fr-label' htmlFor='email'>
          Commune*
        </label>
        <Autocomplete
          inputProps={{
            placeholder: 'Rechercher votre commune',
            required: true,
          }}
          value={bodyData.commune}
          onClearValue={() => onEdit('bodyData')({ ...bodyData, commune: '' })}
          fetchResults={fetchCommunes}
          ResultCmp={(commune: APIGeoCommune) => (
            <div key={commune.code}>
              <button
                tabIndex={0}
                type='button'
                onClick={() =>
                  onEdit('bodyData')({
                    ...bodyData,
                    commune: `${commune.nom} (${commune.code})`,
                  })
                }
              >
                {commune.nom} ({commune.code})
              </button>
            </div>
          )}
        />
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
          onChange={(e) => onEdit('bodyData')({ ...bodyData, message: e.target.value })}
          required
          className='fr-input'
          rows={10}
          name='message'
        />
      </div>
      <button
        disabled={isSubmitDisabled}
        className='fr-btn fr-icon-send-plane-fill fr-btn--icon-right'
        type='submit'
      >
        Envoyer
      </button>
    </StyledContactForm>
  )
}

export default ContactForm
