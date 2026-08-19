import React from "react";
import { Check } from "lucide-react";
import TicketEdge from "../TicketEdge";
import { currency } from "../../utils/format";

export default function Confirmacao({ order, onNovoPedido }) {
  return (
    <div style={{ padding: "24px 18px" }}>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "var(--bf-lettuce)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 10px",
          }}
        >
          <Check size={26} />
        </div>
        <h2 className="bf-display" style={{ fontSize: 24, margin: 0, color: "var(--bf-flame-dark)" }}>Pagamento confirmado</h2>
        <p style={{ fontSize: 13, color: "#6b5a4d", margin: "4px 0 0" }}>Seu pedido já está na fila da loja.</p>
      </div>

      <div style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.12)" }}>
        <TicketEdge top />
        <div style={{ padding: "16px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
            <span className="bf-display" style={{ fontSize: 18 }}>Ticket #{order.id}</span>
            <span className="bf-mono" style={{ fontSize: 11, color: "#6b5a4d" }}>
              {new Date(order.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
          <div style={{ borderTop: "1px dashed #d8c7a8", paddingTop: 10 }}>
            {order.items.map((i) => (
              <div key={i.id} className="bf-mono" style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 4 }}>
                <span>{i.qty}x {i.name}</span>
                <span>{currency(i.price * i.qty)}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px dashed #d8c7a8", marginTop: 8, paddingTop: 8, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Total</span>
            <span className="bf-mono" style={{ fontSize: 14, fontWeight: 500 }}>{currency(order.total)}</span>
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: "#6b5a4d", lineHeight: 1.5 }}>
            <div>{order.nome} · {order.telefone}</div>
            <div>{order.endereco}</div>
          </div>
        </div>
        <TicketEdge />
      </div>

      <button
        className="bf-btn"
        onClick={onNovoPedido}
        style={{ width: "100%", marginTop: 18, padding: "12px", borderRadius: 10, background: "var(--bf-ink)", color: "#fff", fontWeight: 700, fontSize: 14 }}
      >
        Fazer novo pedido
      </button>
    </div>
  );
}
