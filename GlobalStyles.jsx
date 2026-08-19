import React from "react";

// Tokens visuais do protótipo: paleta "hamburgueria de brasa" + tipografia
// com antialiasing forçado para evitar o serrilhado em telas comuns.
export const TOKENS = {
  ink: "#221510",
  paper: "#FBF3E4",
  flame: "#D6431F",
  flameDark: "#A8330F",
  cheddar: "#E8A23A",
  lettuce: "#5B7A3C",
};

export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap');

      .bf-root, .bf-root * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        box-sizing: border-box;
      }
      .bf-root {
        font-family: 'Inter', system-ui, sans-serif;
      }
      .bf-display {
        font-family: 'Fraunces', Georgia, serif;
        font-weight: 600;
        font-optical-sizing: auto;
        letter-spacing: -0.01em;
      }
      .bf-mono {
        font-family: 'IBM Plex Mono', monospace;
      }
      .bf-btn {
        cursor: pointer;
        border: none;
        font-family: inherit;
      }
      .bf-btn:active {
        transform: scale(0.98);
      }
    `}</style>
  );
}
