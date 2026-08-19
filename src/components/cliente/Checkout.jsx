import React from "react";
import { ChevronLeft, User, Phone, MapPin, QrCode, CreditCard, Banknote } from "lucide-react";
import { currency } from "../../utils/format";

export default function Checkout({ form, setForm, errors, total, placing, onVoltar, onPagar }) {
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const field = (label, key, Icon, placeholder, type = "text") => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600, marginBottom: 5, color: "#6b5a4d" }}>
        <Icon size={13} /> {label}
      </label>
      <input
        type={type}
        value={form[key]}
        onChange={set(key)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 9,
          border: errors[key] ? "1.5px solid #C0392B" : "1.5px solid #e4d7c2",
          fontSize: 14,
          fontFamily: "inherit",
          background: "#fff",
        }}
      />
      {errors[key] && <p style={{ margin: "4px 0 0", fontSize: 12, color: "#C0392B" }}>{errors[key]}</p>}
    </div>
  );

  const pagamentos = [
    { key: "pix", label: "Pix", icon: QrCode },
    { key: "cartao", label: "Cartão", icon: CreditCard },
    { key: "dinheiro", label: "Dinheiro", icon: Banknote },
  ];

  return (
    <div style={{ padding: "18px 18px 24px" }}>
      <button
        className="bf-btn"
        onClick={onVoltar}
        style={{ background: "transparent", color: "var(--bf-flame-dark)", display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, padding: 0, marginBottom: 14 }}
      >
        <ChevronLeft size={16} /> Voltar ao cardápio
      </button>

      <h2 className="bf-display" style={{ fontSize: 24, margin: "0 0 14px", color: "var(--bf-flame-dark)" }}>Finalizar pedido</h2>

      {field("Nome", "nome", User, "Seu nome completo")}
      {field("Telefone", "telefone", Phone, "(00) 00000-0000")}
      {field("Endereço de entrega", "endereco", MapPin, "Rua, número, bairro")}

      <p style={{ fontSize: 12.5, fontWeight: 600, color: "#6b5a4d", margin: "4px 0 8px" }}>Forma de pagamento</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        {pagamentos.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            className="bf-btn"
            onClick={() => setForm((f) => ({ ...f, pagamento: key }))}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              padding: "10px 4px",
              borderRadius: 9,
              border: form.pagamento === key ? "1.5px solid var(--bf-flame)" : "1.5px solid #e4d7c2",
              background: form.pagamento === key ? "#FCEAE2" : "#fff",
              color: form.pagamento === key ? "var(--bf-flame-dark)" : "#6b5a4d",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "1.5px dashed #d8c7a8", marginBottom: 16 }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>Total</span>
        <span className="bf-mono" style={{ fontSize: 18, fontWeight: 500 }}>{currency(total)}</span>
      </div>

      <button
        className="bf-btn"
        onClick={onPagar}
        disabled={placing}
        style={{ width: "100%", padding: "13px", borderRadius: 10, background: "var(--bf-flame)", color: "#fff", fontWeight: 700, fontSize: 15, opacity: placing ? 0.7 : 1 }}
      >
        {placing ? "Processando pagamento…" : `Pagar ${currency(total)}`}
      </button>
    </div>
  );
}
