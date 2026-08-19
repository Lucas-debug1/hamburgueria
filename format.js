export function currency(v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
