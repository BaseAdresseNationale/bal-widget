import { useCallback, useState } from 'react'

export interface MailToParams<T> {
  to: string
  subject: string
  bodyData: T
  bcc?: string
  cc?: string
}

export const useMailToForm = <T>(
  initialData: MailToParams<T>,
  getBody: (formData: T) => string | Promise<string>,
) => {
  const [mailToData, setMailToData] = useState<MailToParams<T>>(initialData)

  const getMailtoHref = useCallback(async () => {
    const { to, ...relevantState } = mailToData

    const suffixParts = await Promise.all(
      (Object.keys(relevantState) as Array<keyof Omit<MailToParams<T>, 'to'>>).map(async (key) => {
        if (mailToData[key]) {
          const valueToEncode =
            key === 'bodyData' ? await getBody(mailToData[key]) : (mailToData[key] as string)

          const encodedValue = valueToEncode
            .split('\n')
            .map((parts) => encodeURIComponent(parts))
            .join('%0D%0A')

          return ((key === 'bodyData' ? 'body' : key) as string) + '=' + encodedValue
        }

        return ''
      }),
    )

    const suffix = suffixParts.join('&')

    return `mailto:${to}${suffix && `?${suffix}`}`
  }, [mailToData])

  const onEdit = (key: keyof MailToParams<T>) => (value: T | string | null) => {
    setMailToData((prev) => ({ ...prev, [key]: value }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const mailtoHref = await getMailtoHref()
    window.open(mailtoHref)
  }

  return {
    mailToData,
    onEdit,
    onSubmit,
  }
}
