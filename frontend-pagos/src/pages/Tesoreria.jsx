const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000";

async function marcarPagado(id) {
  const r = await fetch(`${API_BASE}/api/pay/charges/${id}/mark-paid`, { method:"POST" });
  const j = await r.json();
  if (j.ok) setRows(rs => rs.map(x => x.id===id ? {...x, estado:"paid"} : x));
}

async function reenviar(id) {
  const r = await fetch(`${API_BASE}/api/pay/charges/${id}/remind`, {
    method:"POST", headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ channel:"email" }) // o "whatsapp"
  });
  const j = await r.json();
  if (j.ok) alert("Recordatorio enviado");
}
