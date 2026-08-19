import React from "react";

export default function TicketEdge({ top }) {
  return (
    <div
      style={{
        height: 10,
        backgroundImage:
          "radial-gradient(circle at 8px " + (top ? "0px" : "10px") + ", transparent 8px, var(--bf-paper) 8.5px)",
        backgroundSize: "16px 16px",
        backgroundPosition: "left",
      }}
    />
  );
}
