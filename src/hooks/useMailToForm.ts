import { useMemo, useState } from 'react'

export interface MailToParams {
  bcc?: string
  cc?: string
  subject: string
  body: string
  to: string
}

export const useMailToForm = (initialData: MailToParams) => {
  const [mailToData, setMailToData] = useState<MailToParams>(initialData)

  const mailtoHref = useMemo(() => {
    const { to, ...relevantState } = mailToData
    const validKeys = (Object.keys(relevantState) as Array<keyof Omit<MailToParams, 'to'>>).filter(
      (param) => (relevantState[param] as string).length > 0,
    )
    const suffix = validKeys
      .map((key) => {
        if (mailToData[key]) {
          const encodedValue = (mailToData[key] as string)
            .split('\n')
            .map((parts) => encodeURIComponent(parts))
            .join('%0D%0A')

          return (key as string) + '=' + encodedValue
        }
        return ''
      })
      .join('&')
    const mailtoHref = `mailto:${to}${suffix && `?${suffix}`}`
    return mailtoHref
  }, [mailToData])

  const onEdit = (key: keyof MailToParams) => (value: string | null) => {
    setMailToData((prev) => ({ ...prev, [key]: value }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    window.open(mailtoHref)
  }

  return {
    mailToData,
    onEdit,
    onSubmit,
  }
}
