# Chapa & Brasa — Protótipo

Protótipo de front-end para apresentar ao cliente: pedido do cliente, pagamento
(simulado) e uma tela separada, protegida por PIN, para a loja/entregador
acompanhar os pedidos pagos.

## Estrutura

```
burger-flow/
├── index.html                      # HTML raiz (entrada do Vite)
├── package.json                    # dependências e scripts (dev/build)
├── vite.config.js                  # configuração do Vite
├── .gitignore
└── src/
    ├── main.jsx                     # inicializa o React
    ├── index.css                    # reset básico + fundo da página
    ├── App.jsx                      # componente raiz, monta a paleta de cores e alterna as telas
    ├── GlobalStyles.jsx             # fontes, antialiasing e tokens de cor
    ├── data/
    │   └── menu.js                  # cardápio, status do pedido, PIN da loja
    ├── utils/
    │   ├── format.js                # formatação de moeda (R$)
    │   └── storage.js               # leitura/gravação dos pedidos (simula o backend)
    └── components/
        ├── TopSwitch.jsx             # alterna entre "Fazer pedido" e "Loja/entregador"
        ├── TicketEdge.jsx            # borda picotada usada nos tickets
        ├── cliente/
        │   ├── ClienteView.jsx       # cardápio + carrinho
        │   ├── QtyStepper.jsx        # botão +/- de cada item
        │   ├── Checkout.jsx          # formulário de entrega e pagamento
        │   └── Confirmacao.jsx       # ticket de confirmação do pagamento
        └── loja/
            ├── LojaView.jsx          # tela de PIN
            ├── Fila.jsx              # lista de pedidos pagos
            └── TicketCard.jsx        # card de cada pedido na fila
```

## Sobre a tipografia

O visual usa **Fraunces** (serifada, elegante) nos títulos e **Inter** no
corpo do texto, com antialiasing forçado via CSS (`-webkit-font-smoothing`,
`text-rendering: optimizeLegibility`) para evitar o serrilhado que aparecia
antes — principalmente em fontes condensadas exibidas em tamanho pequeno.

## Como rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Como publicar no Vercel

**Opção 1 — pelo site, sem git (mais rápido para testar):**
1. Acesse vercel.com e crie uma conta/faça login.
2. No dashboard, clique em "Add New… → Project".
3. Arraste a pasta `burger-flow` (a pasta inteira, com `package.json` na raiz).
4. O Vercel detecta automaticamente que é um projeto Vite — não precisa mudar nada,
   só confirmar o deploy.
5. Em 1–2 minutos você recebe uma URL pública (tipo `chapa-e-brasa.vercel.app`)
   para mandar pro cliente.

**Opção 2 — via GitHub (recomendado se for continuar evoluindo o projeto):**
1. Suba esta pasta para um repositório no GitHub.
2. No Vercel, "Add New… → Project" → conecte o repositório.
3. Framework Preset: **Vite** (o Vercel costuma detectar sozinho).
4. Build Command: `npm run build` — Output Directory: `dist` (padrão, não precisa mexer).
5. Deploy.

**Opção 3 — via terminal:**
```bash
npm install -g vercel
vercel
```
e seguir as perguntas (ele já reconhece o Vite automaticamente).

## Sobre o pagamento e os pedidos

Pagamento e status são simulados — não há backend real nem gateway de
pagamento. Os pedidos usam `window.storage` quando disponível (ambiente do
Claude) e caem automaticamente para `localStorage` do navegador fora dele —
o que significa que, no Vercel, a fila de pedidos é *local ao navegador*:
para o cliente ver, ao vivo, um pedido feito em outro celular/aba aparecendo
na tela da loja, seria necessário um backend real com banco de dados —
próximo passo natural depois que o protótipo for aprovado.
