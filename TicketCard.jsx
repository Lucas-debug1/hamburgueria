import React from "react";
import { Clock, MapPin } from "lucide-react";
import TicketEdge from "../TicketEdge";
import { currency } from "../../utils/format";
import { STATUS_FLOW } from "../../data/menu";

export default function TicketCard({ order, onAvancar }) {
  const idx = STATUS_FLOW.indexOf(order.status);
  const isDone = idx === STATUS_FLOW.length - 1;
  const badgeColor = isDone ? "var(--bf-lettuce)" : idx === 0 ? "var(--bf-cheddar)" : "var(--bf-flame)";

  return (
    <div style={{ background: "#fff" }}>
      <TicketEdge top />
      <div style={{ padding: "14px 18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div>
            <span className="bf-display" style={{ fontSize: 18 }}>#{order.id}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#6b5a4d", marginTop: 2 }}>
              <Clock size={11} />
              {new Date(order.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
          <span
            className="bf-mono"
            style={{ fontSize: 10.5, fontWeight: 600, padding: "4px 9px", borderRadius: 20, background: badgeColor, color: "#fff", whiteSpace: "nowrap" }}
          >
            {order.status.toUpperCase()}
          </span>
        </div>

        <div style={{ borderTop: "1px dashed #d8c7a8", paddingTop: 8 }}>
          {order.items.map((i) => (
            <div key={i.id} className="bf-mono" style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
              <span>{i.qty}x {i.name}</span>
              <span>{currency(i.price * i.qty)}</span>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px dashed #d8c7a8", marginTop: 6, paddingTop: 6, display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12.5, fontWeight: 600 }}>Total ({order.pagamento})</span>
          <span className="bf-mono" style={{ fontSize: 13, fontWeight: 500 }}>{currency(order.total)}</span>
        </div>

        <div style={{ marginTop: 10, fontSize: 12, color: "#4a3b30", lineHeight: 1.5 }}>
          <div style={{ fontWeight: 600 }}>{order.nome} · {order.telefone}</div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 4, marginTop: 2 }}>
            <MapPin size={12} style={{ marginTop: 2, flexShrink: 0 }} />
            <span>{order.endereco}</span>
          </div>
        </div>

        {!isDone && (
          <button
            className="bf-btn"
            onClick={onAvancar}
            style={{ width: "100%", marginTop: 12, padding: "10px", borderRadius: 9, background: "var(--bf-flame)", color: "#fff", fontWeight: 700, fontSize: 13 }}
          >
            Avançar para "{STATUS_FLOW[idx + 1]}"
          </button>
        )}
      </div>
      <TicketEdge />
    </div>
  );
}
