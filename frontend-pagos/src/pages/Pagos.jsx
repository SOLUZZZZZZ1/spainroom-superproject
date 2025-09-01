import { useState } from "react";

export default function Pagos() {
  const [contrato,setContrato]=useState(""),[email,setEmail]=useState(""),[importe,setImporte]=useState(""),[msg,setMsg]=useState("");
  function generarEnlace(){
    if(!contrato||!email||!importe){ setMsg("Completa contrato, email e importe"); return; }
    const url=`/pagar/mock?c=${encodeURIComponent(contrato)}&e=${encodeURIComponent(email)}&i=${encodeURIComponent(importe)}`;
    setMsg(`Enlace de pago generado: ${location.origin}${url}`);
  }
  return (
    <main style={{padding:16}}>
      <h2>Pagos · Inquilino</h2>
      <div style={{display:"grid",gap:10,maxWidth:520}}>
        <input placeholder="Contrato / Ref" value={contrato} onChange={e=>setContrato(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Importe (€)" value={importe} onChange={e=>setImporte(e.target.value)} />
        <button onClick={generarEnlace}>Generar enlace</button>
        {msg && <small>{msg}</small>}
      </div>
    </main>
  );
}
