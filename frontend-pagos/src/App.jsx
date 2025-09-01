// src/App.jsx
import React, { useMemo, useState } from "react";
import NoraChat from "./components/NoraChatLite";

/* Utilidades */
const toEUR = (n) =>
  (typeof n === "number" ? n : Number(n || 0)).toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });

export default function App() {
  const [tab, setTab] = useState("pagar"); // "pagar" | "tesoreria"

  return (
    <>
      <Header tab={tab} onTab={setTab} />
      {tab === "pagar" ? <PagarAhora /> : <TesoreriaDemo />}
      <NoraChat />
    </>
  );
}

/* ─────────────── Header / Tabs ─────────────── */
function Header({ tab, onTab }) {
  return (
    <header style={bar}>
      <div style={inner}>
        <div style={brand}>
          <span style={brandLogo}>💳</span>
          <span style={brandText}>SpainRoom · Pagos</span>
        </div>
        <nav style={nav}>
          <TabBtn active={tab === "pagar"} onClick={() => onTab("pagar")}>
            Pagar ahora
          </TabBtn>
          <TabBtn active={tab === "tesoreria"} onClick={() => onTab("tesoreria")}>
            Tesorería
          </TabBtn>
        </nav>
      </div>
    </header>
  );
}
const bar = {
  position: "sticky",
  top: 0,
  zIndex: 10,
  background: "#2563eb",
  borderBottom: "3px solid #003ea8",
};
const inner = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "10px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
};
const brand = { display: "flex", alignItems: "center", gap: 10, color: "#fff" };
const brandLogo = { fontSize: 20 };
const brandText = { fontWeight: 800, letterSpacing: 0.3 };
const nav = { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" };
function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 12px",
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        fontWeight: 800,
        color: "#fff",
        background: active ? "rgba(255,255,255,0.18)" : "transparent",
      }}
    >
      {children}
    </button>
  );
}

/* ─────────────── Pagar ahora ─────────────── */
function PagarAhora() {
  const [contrato, setContrato] = useState("");
  const [email, setEmail] = useState("");
  const [importe, setImporte] = useState("");
  const [nota, setNota] = useState("");
  const [link, setLink] = useState("");

  function genLink() {
    if (!contrato || !email || !importe) {
      alert("Completa Contrato/Ref, Email e Importe.");
      return;
    }
    const url = new URL("/pagar/mock", location.origin);
    url.searchParams.set("c", contrato);
    url.searchParams.set("e", email);
    url.searchParams.set("i", String(importe).trim());
    if (nota) url.searchParams.set("n", nota.trim());
    setLink(String(url));
  }

  async function copyLink() {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      alert("Enlace copiado.");
    } catch {
      prompt("Copia el enlace:", link);
    }
  }

  return (
    <main style={wrap}>
      <section style={card}>
        <h1 style={{ margin: "0 0 6px 0" }}>Pagar ahora</h1>
        <p style={{ margin: 0, color: "#64748b" }}>
          Genera un enlace de pago para enviarlo al inquilino (WhatsApp/email) o para abrirlo tú.
        </p>

        <div style={grid}>
          <div>
            <label style={lbl}>Contrato / Referencia</label>
            <input
              style={inp}
              placeholder="SP-00123, HAB-3, etc."
              value={contrato}
              onChange={(e) => setContrato(e.target.value)}
            />
          </div>
          <div>
            <label style={lbl}>Email del inquilino</label>
            <input
              style={inp}
              placeholder="inquilino@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>
          <div>
            <label style={lbl}>Importe (€)</label>
            <input
              style={inp}
              placeholder="450.00"
              value={importe}
              onChange={(e) => setImporte(e.target.value)}
              type="number"
              step="0.01"
              min="0"
            />
          </div>
          <div>
            <label style={lbl}>Nota (opcional)</label>
            <input
              style={inp}
              placeholder="Agosto 2025, Hab. 2…"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
          <button onClick={genLink} style={btnPrimary}>
            Generar enlace
          </button>
          <button onClick={copyLink} disabled={!link} style={btnGhost}>
            Copiar enlace
          </button>
          {link && (
            <a href={link} target="_blank" rel="noreferrer" style={btnOpen}>
              Abrir enlace ↗
            </a>
          )}
        </div>

        {link && (
          <div style={{ marginTop: 12, padding: 10, border: "1px dashed #cbd5e1", borderRadius: 10 }}>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>Enlace generado</div>
            <div style={{ wordBreak: "break-all" }}>{link}</div>
          </div>
        )}
      </section>
    </main>
  );
}

/* ─────────────── Tesorería (demo local) ─────────────── */
function TesoreriaDemo() {
  const [items, setItems] = useState([
    { id: "CHG-0001", contrato: "SP-00123", inquilino: "Ana Pérez", periodo: "2025-08", importe: 450, estado: "Pendiente" },
    { id: "CHG-0002", contrato: "SP-00991", inquilino: "Luis Gómez", periodo: "2025-08", importe: 520, estado: "Pagada" },
  ]);

  const pendienteTotal = useMemo(
    () => items.filter((x) => x.estado !== "Pagada").reduce((a, b) => a + Number(b.importe || 0), 0),
    [items]
  );

  function marcar(id, nuevo) {
    setItems((arr) => arr.map((x) => (x.id === id ? { ...x, estado: nuevo } : x)));
  }

  return (
    <main style={wrap}>
      <section style={card}>
        <h1 style={{ margin: "0 0 6px 0" }}>Tesorería · Cobros</h1>
        <p style={{ margin: 0, color: "#64748b" }}>
          Demo local (sin backend): marcar pagadas y controlar pendiente.
        </p>

        <div style={pillTotal}>
          <b>Pendiente:</b>&nbsp;{toEUR(pendienteTotal)}
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={tbl}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Contrato</th>
                <th>Inquilino</th>
                <th>Periodo</th>
                <th>Importe</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.contrato}</td>
                  <td>{r.inquilino}</td>
                  <td>{r.periodo}</td>
                  <td>{toEUR(r.importe)}</td>
                  <td>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: 999,
                        background: r.estado === "Pagada" ? "#dcfce7" : "#fee2e2",
                        border: "1px solid " + (r.estado === "Pagada" ? "#16a34a55" : "#ef444455"),
                        color: r.estado === "Pagada" ? "#065f46" : "#7f1d1d",
                        fontWeight: 800,
                        fontSize: 12,
                      }}
                    >
                      {r.estado}
                    </span>
                  </td>
                  <td>
                    {r.estado === "Pagada" ? (
                      <button onClick={() => marcar(r.id, "Pendiente")} style={btnGhost}>
                        Marcar pendiente
                      </button>
                    ) : (
                      <button onClick={() => marcar(r.id, "Pagada")} style={btnPrimary}>
                        Marcar pagada
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {!items.length && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: 18, color: "#64748b" }}>
                    No hay registros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

/* ─────────────── Estilos base ─────────────── */
const wrap = { padding: 16 };
const card = {
  margin: "16px auto",
  maxWidth: 1100,
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
  padding: 16,
};
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  marginTop: 12,
};
const lbl = { display: "block", fontSize: 12, color: "#64748b", marginBottom: 6, fontWeight: 700 };
const inp = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  outline: "none",
};
const btnPrimary = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "none",
  background: "#2563eb",
  color: "#fff",
  fontWeight: 800,
  cursor: "pointer",
};
const btnGhost = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #cbd5e1",
  background: "#fff",
  color: "#0f172a",
  fontWeight: 800,
  cursor: "pointer",
};
const btnOpen = {
  ...btnGhost,
  textDecoration: "none",
  display: "inline-block",
};
const pillTotal = {
  marginTop: 12,
  marginBottom: 12,
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: 999,
  background: "#fff7ed",
  border: "1px solid #f59e0b55",
  color: "#7c2d12",
  fontWeight: 800,
};
const tbl = {
  width: "100%",
  borderCollapse: "collapse",
  border: "1px solid #e5e7eb",
  borderRadius: 10,
  overflow: "hidden",
};
