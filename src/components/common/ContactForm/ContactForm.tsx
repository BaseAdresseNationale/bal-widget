import { StyledContactForm } from './ContactForm.styles'
import { useMailToForm } from '../../../hooks/useMailToForm'
import { fetchCommunes } from '../../../lib/api-geo'
import { APIGeoCommune } from '../../../types/APIGeo.types'
import SearchInput from './../../common/SearchInput'
import { SearchItemType } from '../SearchInput/SearchInput'
import Input from '@codegouvfr/react-dsfr/Input'
import { Select } from '@codegouvfr/react-dsfr/Select'
import { Button } from '@codegouvfr/react-dsfr/Button'

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
  return `Message généré par BAL-Widget via le formulaire de contact pour les communes.\n\nCorrespondant:\nNom: ${lastName}\nPrénom: ${firstName}\nCommune: ${commune}\n\nMessage:\n${message}`
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
          <Input
            label='Prénom'
            nativeInputProps={{
              onChange: (e) => onEdit('bodyData')({ ...bodyData, firstName: e.target.value }),
              type: 'text',
              name: 'firstName',
              autoComplete: 'given-name',
            }}
          />
        </div>
        <div className='fr-col-6'>
          <Input
            label='Nom'
            nativeInputProps={{
              onChange: (e) => onEdit('bodyData')({ ...bodyData, lastName: e.target.value }),
              type: 'text',
              name: 'lastName',
              autoComplete: 'family-name',
            }}
          />
        </div>
      </div>

      <div className='input-wrapper'>
        <SearchInput
          onSearch={fetchCommunes}
          itemToString={(commune?: SearchItemType<APIGeoCommune> | null) =>
            commune ? `${commune.nom} (${commune.code})` : ''
          }
          onSelect={(commune?: SearchItemType<APIGeoCommune> | null) => {
            if (commune) {
              onEdit('bodyData')({
                ...bodyData,
                commune: `${commune.nom} (${commune.code})`,
              })
            }
          }}
          label='Commune*'
          nativeInputProps={{ placeholder: 'Amboise...', required: true }}
        />
      </div>

      <div className='input-wrapper'>
        <Select
          label='Sujet de votre message*'
          nativeSelectProps={{
            onChange: (e) => onEdit('subject')(e.target.value),
            defaultValue: '',
            required: true,
          }}
        >
          <option value='' disabled>
            Selectionnez une option
          </option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </Select>
      </div>

      <div className='input-wrapper'>
        <Input
          label='Votre message*'
          textArea
          nativeTextAreaProps={{
            required: true,
            onChange: (e) => {
              onEdit('bodyData')({ ...bodyData, message: e.target.value })
            },
            rows: 10,
          }}
        />
      </div>

      <legend>Les champs avec * sont obligatoires</legend>
      <Button
        type='submit'
        disabled={isSubmitDisabled}
        iconId='fr-icon-send-plane-fill'
        iconPosition='right'
      >
        Envoyer
      </Button>
    </StyledContactForm>
  )
}

export default ContactForm
