const STORAGE_KEY = "burgerflow-orders";

// Em produção isso seria uma chamada de API para o backend real da loja.
// Aqui simulamos o pedido pago "chegando" na tela da loja/entregador.
// window.storage só existe dentro do ambiente de artifacts do Claude;
// rodando este projeto fora dele (Vite, CRA etc.), o código cai para
// localStorage automaticamente, para o protótipo continuar funcionando.
const hasClaudeStorage = typeof window !== "undefined" && window.storage;

export async function loadOrders() {
  try {
    if (hasClaudeStorage) {
      const res = await window.storage.get(STORAGE_KEY, true);
      return res ? JSON.parse(res.value) : [];
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export async function saveOrders(orders) {
  try {
    if (hasClaudeStorage) {
      await window.storage.set(STORAGE_KEY, JSON.stringify(orders), true);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    }
  } catch (e) {
    console.error("Falha ao salvar pedidos", e);
  }
}
