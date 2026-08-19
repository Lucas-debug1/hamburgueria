import React, { useState, useEffect, useCallback } from "react";
import { Bike, RefreshCw } from "lucide-react";
import { loadOrders, saveOrders } from "../../utils/storage";
import { STATUS_FLOW } from "../../data/menu";
import TicketCard from "./TicketCard";

export default function Fila() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await loadOrders();
    setOrders(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    const t = setInterval(refresh, 5000);
    return () => clearInterval(t);
  }, [refresh]);

  const advance = async (id) => {
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) return;
    const current = orders[idx];
    const next = STATUS_FLOW[STATUS_FLOW.indexOf(current.status) + 1];
    if (!next) return;
    const updated = orders.map((o) => (o.id === id ? { ...o, status: next } : o));
    setOrders(updated);
    await saveOrders(updated);
  };

  return (
    <div style={{ background: "var(--bf-ink)", minHeight: 480, padding: "16px 14px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#fff" }}>
          <Bike size={18} color="var(--bf-cheddar)" />
          <span className="bf-display" style={{ fontSize: 20 }}>Fila de pedidos</span>
        </div>
        <button
          className="bf-btn"
          onClick={refresh}
          aria-label="Atualizar"
          style={{ background: "transparent", color: "#c9c0b8", display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}
        >
          <RefreshCw size={13} /> atualizar
        </button>
      </div>

      {!loading && orders.length === 0 && (
        <p style={{ color: "#c9c0b8", fontSize: 13, textAlign: "center", marginTop: 40 }}>Nenhum pedido pago ainda.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {orders.map((o) => (
          <TicketCard key={o.id} order={o} onAvancar={() => advance(o.id)} />
        ))}
      </div>
    </div>
  );
}
