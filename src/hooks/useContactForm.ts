import { useMemo, useState } from 'react'

export enum EmailSentStatus {
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
  captchaToken: string
}

export const useContactForm = <T extends { captchaToken: string }>(
  initialData: T,
  handleSubmit: (formData: T) => Promise<void>,
) => {
  const [emailStatus, setEmailStatus] = useState<EmailSentStatus>(EmailSentStatus.NOT_SENT)
  const [formData, setFormData] = useState<T>(initialData)

  const canSubmit = useMemo(() => {
    return Boolean(formData.captchaToken)
  }, [formData.captchaToken])

  const onEdit = (key: keyof T) => (value: string | null) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setEmailStatus(EmailSentStatus.SENDING)
      await handleSubmit(formData)
      setEmailStatus(EmailSentStatus.SENT)
    } catch (error) {
      console.log(error)
      setEmailStatus(EmailSentStatus.ERROR)
    }
  }

  return {
    emailStatus,
    formData,
    canSubmit,
    onEdit,
    onSubmit,
  }
}
