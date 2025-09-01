import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'

// Optional: Google Analytics (GA4) via env var VITE_GA4_ID
function injectGA4(id){
  if(!id) return
  const s1 = document.createElement('script')
  s1.async = true
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(s1)
  const s2 = document.createElement('script')
  s2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`
  document.head.appendChild(s2)
}
injectGA4(import.meta.env.VITE_GA4_ID)

// Optional: Sentry (frontend) via env var VITE_SENTRY_DSN
async function initSentry(){
  const dsn = import.meta.env.VITE_SENTRY_DSN
  if(!dsn) return
  const Sentry = await import('@sentry/react')
  Sentry.init({
    dsn,
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 1.0
  })
}
initSentry()

import './styles/sr-web2-fix.css'

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
)
