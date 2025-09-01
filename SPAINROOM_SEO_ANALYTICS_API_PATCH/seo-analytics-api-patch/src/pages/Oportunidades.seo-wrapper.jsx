import React from 'react'
import { Helmet } from 'react-helmet-async'

export default function OportunidadesSEOWrapper({ children }){
  return (
    <>
      <Helmet>
        <title>Oportunidades — SpainRoom</title>
        <meta name="description" content="Ofertas para inmobiliarias, habitaciones en promoción y opciones de inversión en SpainRoom." />
      </Helmet>
      {children}
    </>
  )
}
