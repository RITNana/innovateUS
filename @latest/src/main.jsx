import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NewsletterOptInForm from './NewsletterOptInForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NewsletterOptInForm />
  </StrictMode>,
)
