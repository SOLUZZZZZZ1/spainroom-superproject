import React from 'react'
import { Helmet } from 'react-helmet-async'

export default function ReservasSEOWrapper({ children }){
  return (
    <>
      <Helmet>
        <title>Reservas — SpainRoom</title>
        <meta name="description" content="Confirma disponibilidad, agenda una visita o deja tus datos para que te llamemos." />
      </Helmet>
      {children}
    </>
  )
}
