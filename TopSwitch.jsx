import React from "react";
import { ShoppingBag, Store } from "lucide-react";

export default function TopSwitch({ view, setView }) {
  const tabs = [
    { key: "cliente", label: "Fazer pedido", icon: ShoppingBag },
    { key: "loja", label: "Loja / entregador", icon: Store },
  ];

  return (
    <div style={{ display: "flex", background: "var(--bf-ink)", padding: 6, gap: 6 }}>
      {tabs.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          className="bf-btn"
          onClick={() => setView(key)}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "10px 8px",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            background: view === key ? "var(--bf-flame)" : "transparent",
            color: view === key ? "#fff" : "#c9c0b8",
          }}
        >
          <Icon size={15} />
          {label}
        </button>
      ))}
    </div>
  );
}
