import React from "react";
import { Plus, Minus } from "lucide-react";

export default function QtyStepper({ qty, onChange }) {
  if (qty === 0) {
    return (
      <button
        className="bf-btn"
        onClick={() => onChange(1)}
        aria-label="Adicionar"
        style={{
          alignSelf: "center",
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "var(--bf-flame)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Plus size={16} />
      </button>
    );
  }
  return (
    <div
      style={{
        alignSelf: "center",
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "#f1e6d3",
        borderRadius: 8,
        padding: "4px 6px",
      }}
    >
      <button
        className="bf-btn"
        onClick={() => onChange(-1)}
        aria-label="Remover"
        style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", color: "var(--bf-flame-dark)" }}
      >
        <Minus size={14} />
      </button>
      <span className="bf-mono" style={{ minWidth: 14, textAlign: "center", fontSize: 13 }}>{qty}</span>
      <button
        className="bf-btn"
        onClick={() => onChange(1)}
        aria-label="Adicionar"
        style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", color: "var(--bf-flame-dark)" }}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
