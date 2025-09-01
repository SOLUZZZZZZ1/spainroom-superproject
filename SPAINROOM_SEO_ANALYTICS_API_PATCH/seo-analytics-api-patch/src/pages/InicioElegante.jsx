import React from 'react'
import { Helmet } from 'react-helmet-async'

export default function InicioElegante(){
  return (
    <>
      <Helmet>
        <title>SpainRoom — Alquiler de habitaciones fáciles</title>
        <meta name="description" content="Encuentra habitaciones listas para entrar a vivir en las mejores zonas. SpainRoom conecta personas, viviendas y oportunidades. Confiable, moderno y cercano." />
        <meta property="og:title" content="SpainRoom — Alquiler de habitaciones" />
        <meta property="og:description" content="Habitaciones listas para entrar a vivir en las mejores zonas." />
      </Helmet>
      <section className="sr-hero">
        <div className="sr-container">
          <div className="sr-hero-card">
            <img src="/logo.png" alt="SpainRoom" className="sr-hero-logo" />
            <h1 className="sr-hero-title">Bienvenido a SpainRoom</h1>
            <p className="sr-hero-text">
              Encuentra habitaciones listas para entrar a vivir en las mejores zonas.
              <br/>SpainRoom conecta personas, viviendas y oportunidades. Confiable, moderno y cercano.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
