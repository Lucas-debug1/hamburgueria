import React, { useState } from "react";
import { Flame } from "lucide-react";
import { MENU, CATEGORIAS } from "../../data/menu";
import { currency } from "../../utils/format";
import { loadOrders, saveOrders } from "../../utils/storage";
import { STATUS_FLOW } from "../../data/menu";
import QtyStepper from "./QtyStepper";
import Checkout from "./Checkout";
import Confirmacao from "./Confirmacao";

export default function ClienteView() {
  const [cart, setCart] = useState({});
  const [step, setStep] = useState("menu"); // menu | checkout | confirmado
  const [form, setForm] = useState({ nome: "", telefone: "", endereco: "", pagamento: "pix" });
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState(null);

  const items = Object.entries(cart)
    .map(([id, qty]) => ({ ...MENU.find((m) => m.id === id), qty }))
    .filter((i) => i.qty > 0);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  const changeQty = (id, delta) => {
    setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] || 0) + delta) }));
  };

  const validate = () => {
    const e = {};
    if (!form.nome.trim()) e.nome = "Digite seu nome";
    if (!form.telefone.trim()) e.telefone = "Digite um telefone";
    if (!form.endereco.trim()) e.endereco = "Digite o endereço de entrega";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const finalizarPagamento = async () => {
    if (!validate()) return;
    setPlacing(true);
    const novoPedido = {
      id: Date.now().toString(36).toUpperCase(),
      items: items.map((i) => ({ id: i.id, name: i.name, qty: i.qty, price: i.price })),
      total,
      nome: form.nome,
      telefone: form.telefone,
      endereco: form.endereco,
      pagamento: form.pagamento,
      status: STATUS_FLOW[0],
      createdAt: new Date().toISOString(),
    };
    await new Promise((r) => setTimeout(r, 900)); // simula processamento do pagamento
    const atuais = await loadOrders();
    await saveOrders([novoPedido, ...atuais]);
    setOrder(novoPedido);
    setPlacing(false);
    setStep("confirmado");
  };

  if (step === "confirmado" && order) {
    return (
      <Confirmacao
        order={order}
        onNovoPedido={() => {
          setCart({});
          setForm({ nome: "", telefone: "", endereco: "", pagamento: "pix" });
          setStep("menu");
        }}
      />
    );
  }

  if (step === "checkout") {
    return (
      <Checkout
        form={form}
        setForm={setForm}
        errors={errors}
        total={total}
        placing={placing}
        onVoltar={() => setStep("menu")}
        onPagar={finalizarPagamento}
      />
    );
  }

  return (
    <div style={{ paddingBottom: count ? 78 : 0 }}>
      <div style={{ background: "var(--bf-flame)", color: "#fff", padding: "22px 20px 26px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Flame size={22} />
          <span className="bf-display" style={{ fontSize: 30, lineHeight: 1 }}>Chapa & Brasa</span>
        </div>
        <p style={{ margin: "6px 0 0", fontSize: 13, opacity: 0.9 }}>Peça, pague e acompanhe — sem sair do app.</p>
      </div>

      {CATEGORIAS.map((cat) => (
        <div key={cat} style={{ padding: "16px 16px 0" }}>
          <h3 className="bf-display" style={{ fontSize: 20, margin: "4px 0 8px", color: "var(--bf-flame-dark)" }}>{cat}</h3>
          {MENU.filter((m) => m.cat === cat).map((item) => (
            <div
              key={item.id}
              style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "12px 0", borderBottom: "1px solid rgba(34,21,16,0.08)" }}
            >
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>{item.name}</p>
                <p style={{ margin: "3px 0 6px", fontSize: 12.5, color: "#6b5a4d" }}>{item.desc}</p>
                <span className="bf-mono" style={{ fontSize: 13, fontWeight: 500 }}>{currency(item.price)}</span>
              </div>
              <QtyStepper qty={cart[item.id] || 0} onChange={(d) => changeQty(item.id, d)} />
            </div>
          ))}
        </div>
      ))}
      <div style={{ height: 12 }} />

      {count > 0 && (
        <div
          style={{
            position: "sticky",
            bottom: 0,
            background: "var(--bf-ink)",
            color: "#fff",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "3px solid var(--bf-cheddar)",
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: "#c9c0b8" }}>{count} {count === 1 ? "item" : "itens"}</div>
            <div className="bf-mono" style={{ fontSize: 16, fontWeight: 500 }}>{currency(total)}</div>
          </div>
          <button
            className="bf-btn"
            onClick={() => setStep("checkout")}
            style={{ background: "var(--bf-flame)", color: "#fff", padding: "11px 20px", borderRadius: 10, fontWeight: 700, fontSize: 14 }}
          >
            Ver sacola
          </button>
        </div>
      )}
    </div>
  );
}
