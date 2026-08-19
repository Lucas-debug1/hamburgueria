import React, { useState } from "react";
import { Lock } from "lucide-react";
import { STAFF_PIN } from "../../data/menu";
import Fila from "./Fila";

export default function LojaView() {
  const [authed, setAuthed] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");

  if (!authed) {
    return (
      <div style={{ padding: "50px 24px", textAlign: "center" }}>
        <Lock size={26} color="var(--bf-flame-dark)" />
        <h2 className="bf-display" style={{ fontSize: 22, margin: "10px 0 4px" }}>Área da loja</h2>
        <p style={{ fontSize: 13, color: "#6b5a4d", margin: "0 0 18px" }}>Acesso restrito à equipe e entregadores.</p>
        <input
          className="bf-mono"
          type="password"
          inputMode="numeric"
          value={pin}
          onChange={(e) => {
            setPin(e.target.value);
            setPinError("");
          }}
          placeholder="PIN de acesso"
          style={{ width: 160, textAlign: "center", padding: "10px 12px", borderRadius: 9, border: "1.5px solid #e4d7c2", fontSize: 16, marginBottom: 10 }}
        />
        {pinError && <p style={{ fontSize: 12, color: "#C0392B", margin: "0 0 10px" }}>{pinError}</p>}
        <br />
        <button
          className="bf-btn"
          onClick={() => {
            if (pin === STAFF_PIN) setAuthed(true);
            else setPinError("PIN incorreto. Tente novamente.");
          }}
          style={{ padding: "10px 24px", borderRadius: 9, background: "var(--bf-flame)", color: "#fff", fontWeight: 700, fontSize: 14 }}
        >
          Entrar
        </button>
        <p style={{ fontSize: 11, color: "#a8998a", marginTop: 14 }}>Protótipo: PIN de demonstração é 1234</p>
      </div>
    );
  }

  return <Fila />;
}
