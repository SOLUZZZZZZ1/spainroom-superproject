import React from 'react'
import { Helmet } from 'react-helmet-async'

export default function JobsSEOWrapper({ children }){
  return (
    <>
      <Helmet>
        <title>SpainRoom Jobs — Empleo cerca de ti</title>
        <meta name="description" content="Ofertas cerca (2 km) y búsqueda específica (20 km). Encuentra empleo rápido alrededor de tu habitación." />
      </Helmet>
      {children}
    </>
  )
}
