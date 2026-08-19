import React, { useState } from "react";
import GlobalStyles, { TOKENS } from "./GlobalStyles";
import TopSwitch from "./components/TopSwitch";
import ClienteView from "./components/cliente/ClienteView";
import LojaView from "./components/loja/LojaView";

export default function App() {
  const [view, setView] = useState("cliente");

  return (
    <div
      className="bf-root"
      style={{
        "--bf-ink": TOKENS.ink,
        "--bf-paper": TOKENS.paper,
        "--bf-flame": TOKENS.flame,
        "--bf-flame-dark": TOKENS.flameDark,
        "--bf-cheddar": TOKENS.cheddar,
        "--bf-lettuce": TOKENS.lettuce,
        maxWidth: 460,
        margin: "0 auto",
        background: "var(--bf-paper)",
        minHeight: 640,
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
        color: "var(--bf-ink)",
      }}
    >
      <GlobalStyles />
      <TopSwitch view={view} setView={setView} />
      {view === "cliente" ? <ClienteView /> : <LojaView />}
    </div>
  );
}
