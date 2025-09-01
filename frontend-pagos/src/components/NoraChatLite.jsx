import { useEffect, useRef, useState } from "react";

const PERSONA_SIGN = "—NORA·SR v1";
const CHALLENGE_OK = "nora forever";

function ensureSign(t){ return t?.trim()?.endsWith(PERSONA_SIGN) ? t : `${t?.trim()||""} ${PERSONA_SIGN}`.trim(); }

function loadName(){
  try{ const s=localStorage.getItem("nora_name"); return s||""; }catch{ return ""; }
}
function saveName(n){
  try{ localStorage.setItem("nora_name", n||""); }catch{}
}

function localReply(q){
  const t=(q||"").toLowerCase();
  // reto/firma
  if (/firma|identidad|¿quien eres|quien eres|challenge|nora forever/.test(t)) return CHALLENGE_OK;

  // capturar nombre: "soy X", "me llamo X"
  const m = t.match(/\b(soy|me llamo)\s+([a-záéíóúñ\s]{2,30})/i);
  if (m){ const name = (m[2]||"").trim().replace(/\s+/g," ");
    if (name){ saveName(name); return `Encantada, ${capital(name)}. ¿Sobre qué vivienda o provincia quieres que te ayude?`; }
  }

  if (/hola|buenas|buenos dias|buenas tardes|buenas noches/.test(t)){
    const n = loadName(); return n ? `¡Hola, ${capital(n)}! ¿Seguimos con tu consulta?` : "¡Hola! ¿Eres propietario o inquilino?";
  }

  if (/propietari|alquil|rentabil|publicar/.test(t))
    return "Te ayudo a rentabilizar con seguridad: verificación con ID, cobertura legal y pasos claros. ¿De qué provincia es la vivienda?";

  if (/c[eé]dula|cedula|lpo|ocupaci[oó]n|requisit/.test(t))
    return "Dime provincia/ciudad y te oriento (Cédula, LPO o 2ª Ocupación/DR). También tienes el mapa por provincia.";

  if (/verificaci[oó]n|id|comprobar/.test(t))
    return "Para crear tu verificación con ID, usa el formulario “Comprobar cédula”. Si quieres, te guío campo a campo ahora.";

  if (/tel[eé]fono|llamar|whats|contact/.test(t))
    return "Teléfono: +34 616 23 23 06 · WhatsApp: 34616232306 · Email: atencion@spainroom.es. ¿Prefieres que te llame?";

  return "Puedo ayudarte con requisitos por provincia, verificación con ID, pagos y tesorería. Dime tu caso y avanzamos.";
}
function capital(s){ return s.replace(/\b([a-záéíóúñ])/g, m=>m.toUpperCase()); }

export default function NoraChatLite(){
  const SAVED = (()=>{ try{return JSON.parse(localStorage.getItem("nora_msgs")||"[]");}catch{return []} })();
  const [open,setOpen]=useState(true);
  const [busy,setBusy]=useState(false);
  const [inpt,setInpt]=useState("");
  const [msgs,setMsgs]=useState(SAVED.length?SAVED:[{from:"nora",text:ensureSign("Hola, soy Nora 🤖. ¿En qué te ayudo?")}]);
  const boxRef=useRef(null);

  useEffect(()=>{ if(boxRef.current) boxRef.current.scrollTop=boxRef.current.scrollHeight; },[msgs,open]);
  useEffect(()=>{ localStorage.setItem("nora_msgs", JSON.stringify(msgs)); },[msgs]);

  async function send(){
    const text=inpt.trim(); if(!text || busy) return;
    setMsgs(m=>[...m,{from:"you",text}]); setInpt(""); setBusy(true);
    try{
      const r = localReply(text);
      await new Promise(rz=>setTimeout(rz,120));
      setMsgs(m=>[...m,{from:"nora",text:ensureSign(r)}]);
    }catch{
      setMsgs(m=>[...m,{from:"nora",text:ensureSign("Ahora mismo no puedo responder. Prueba WhatsApp o teléfono, por favor.")}]);
    }finally{ setBusy(false); }
  }

  return (
    <div style={wrap}>
      <div style={head}><b>Nora · Atención</b><button onClick={()=>setOpen(!open)} style={xBtn}>{open?"×":"💬"}</button></div>
      {open && (
        <>
          <div ref={boxRef} style={box}>
            {msgs.map((m,i)=>(
              <div key={i} style={{textAlign:m.from==="you"?"right":"left",margin:"6px 0"}}>
                <span style={{display:"inline-block",padding:"6px 10px",borderRadius:10,
                  background:m.from==="you"?"#2563eb":"#f1f5f9",
                  color:m.from==="you"?"#fff":"#0f172a"}}>{m.text}</span>
              </div>
            ))}
          </div>
          <div style={bar}>
            <input value={inpt} onChange={e=>setInpt(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
                   placeholder="Escribe tu consulta…" style={inp}/>
            <button onClick={send} disabled={busy} style={sendBtn}>{busy?"…":"Enviar"}</button>
          </div>
        </>
      )}
    </div>
  );
}

/* estilos */
const wrap={position:"fixed",right:18,bottom:18,zIndex:70,width:340,maxWidth:"96vw",
  background:"#fff",border:"1px solid #e5e7eb",borderRadius:12,boxShadow:"0 12px 30px rgba(0,0,0,.15)"};
const head={display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",background:"#f8fafc",borderBottom:"1px solid #e5e7eb"};
const xBtn={border:"none",background:"transparent",fontSize:18,lineHeight:1,cursor:"pointer",color:"#64748b"};
const box={padding:10,height:240,overflow:"auto"};
const bar={display:"flex",gap:8,padding:10,borderTop:"1px solid #e5e7eb"};
const inp={flex:1,padding:"8px 10px",border:"1px solid #e2e8f0",borderRadius:10};
const sendBtn={padding:"8px 12px",border:"none",borderRadius:10,background:"#0ea5e9",color:"#fff",fontWeight:700,cursor:"pointer"};
