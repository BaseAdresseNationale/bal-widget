import React, { useCallback, useEffect } from 'react'
import { StyledContactForm } from '../../common/ContactForm/ContactForm.styles'
import { useMailToForm } from '../../../hooks/useMailToForm'
import { getCurrentRevision, getEmailsCommune } from '../../../lib/api-depot'
import { mailToSignalement } from './mailto-signalement.template'

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

export type AdresseProblemFormType = ReturnType<typeof getInitialFormValues>

function AdresseProblemForm({ city, street }: AdresseProblemFormProps) {
  const initialSubject = street ? subjects[0] : subjects[1]

  const getBody = useCallback(
    async (bodyData: AdresseProblemFormType) => {
      let publication: { client?: string; balId?: string; organization?: string } = {}
      try {
        const currentRevision = await getCurrentRevision(city.code)
        publication = {
          client: currentRevision?.client?.nom,
        }
        if (currentRevision?.client?.nom === 'Mes Adresses') {
          publication.balId = currentRevision?.context?.extras?.balId
        } else if (currentRevision?.client?.nom === 'Moissonneur BAL') {
          const sourceId = currentRevision?.context?.extras?.sourceId
          if (sourceId) {
            try {
              const response = await fetch(`https://www.data.gouv.fr/api/1/datasets/${sourceId}`)
              const dataset = await response.json()
              publication.organization = dataset?.organization?.name
            } catch (err) {
              console.error(
                `An error occurred while fetching dataset from data.gouv.fr for sourceId ${sourceId}:`,
                err,
              )
            }
          }
        }
      } catch (err) {
        console.error(`An error occured while fetching current revision for commune ${city.code}`)
      }

      return mailToSignalement(bodyData, publication)
    },
    [city],
  )

  const {
    onEdit,
    onSubmit,
    mailToData: { bodyData, subject },
  } = useMailToForm(
    {
      to: '',
      bcc: 'adresse@data.gouv.fr',
      subject: street ? subjects[0] : subjects[1],
      bodyData: getInitialFormValues(initialSubject, city, street),
    },
    getBody,
  )

  useEffect(() => {
    async function fetchCommuneEmail() {
      try {
        const emails = await getEmailsCommune(city.code)
        onEdit('to')(emails.join(','))
      } catch (err) {
        console.error(`Error fetching commune emails for ${city.code}`)
      }
    }

    fetchCommuneEmail()
  }, [city])

  useEffect(() => {
    onEdit('bodyData')(getInitialFormValues(subject, city, street))
    onEdit('subject')(subject)
  }, [subject])

  return (
    <StyledContactForm onSubmit={onSubmit}>
      <h2>Signalement</h2>
      <div className='fr-select-group'>
        <label className='fr-label' htmlFor='subject'>
          Objet du signalement*
        </label>
        <select
          onChange={(e) => onEdit('subject')(e.target.value)}
          defaultValue={subject}
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
      {subject !== subjects[2] && (
        <div className='input-wrapper'>
          <label className='fr-label' htmlFor='street'>
            Voie*
          </label>
          <input
            onChange={(e) => onEdit('bodyData')({ ...bodyData, street: e.target.value })}
            required
            defaultValue={street}
            className='fr-input'
            type='text'
            name='street'
            {...(subject === subjects[1] ? { disabled: false } : { disabled: true })}
          />
        </div>
      )}
      {subject === subjects[0] && (
        <div className='input-wrapper'>
          <label className='fr-label' htmlFor='number'>
            Adresse manquante*
          </label>
          <input
            onChange={(e) => onEdit('bodyData')({ ...bodyData, number: e.target.value })}
            required
            className='fr-input'
            type='text'
            name='number'
          />
        </div>
      )}
      <div className='input-wrapper'>
        <label className='fr-label' htmlFor='message'>
          Informations complémentaires{subject === subjects[2] && '*'}
        </label>
        <textarea
          onChange={(e) => onEdit('bodyData')({ ...bodyData, message: e.target.value })}
          className='fr-input'
          rows={5}
          name='message'
          {...(subject === subjects[2] ? { required: true } : { required: false })}
        />
      </div>
      <h2>Contact</h2>
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
          />
        </div>
      </div>
      <button className='fr-btn fr-icon-send-plane-fill fr-btn--icon-right' type='submit'>
        Envoyer
      </button>
    </StyledContactForm>
  )
}

export default AdresseProblemForm
