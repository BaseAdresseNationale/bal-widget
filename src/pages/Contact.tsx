import React, { useContext } from 'react'
import AnimatedPage from '../layouts/AnimatedPage'
import ContactForm from '../components/ContactForm/ContactForm'
import ConfigContext from '../contexts/configContext'

function ContactPage() {
  const config = useContext(ConfigContext)

  return (
    <AnimatedPage>
      <ContactForm subjects={config?.contactUs?.subjects || []} />
    </AnimatedPage>
  )
}

export default ContactPage
