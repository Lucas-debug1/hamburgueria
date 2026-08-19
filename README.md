# Chapa & Brasa — Protótipo

Protótipo de front-end para apresentar ao cliente: pedido do cliente, pagamento
(simulado) e uma tela separada, protegida por PIN, para a loja/entregador
acompanhar os pedidos pagos.

## Estrutura

```
burger-flow/
├── App.jsx                        # componente raiz, monta a paleta de cores e alterna as telas
├── GlobalStyles.jsx                # fontes, antialiasing e tokens de cor
├── data/
│   └── menu.js                    # cardápio, status do pedido, PIN da loja
├── utils/
│   ├── format.js                  # formatação de moeda (R$)
│   └── storage.js                 # leitura/gravação dos pedidos (simula o backend)
├── components/
│   ├── TopSwitch.jsx               # alterna entre "Fazer pedido" e "Loja/entregador"
│   ├── TicketEdge.jsx              # borda picotada usada nos tickets
│   ├── cliente/
│   │   ├── ClienteView.jsx         # cardápio + carrinho
│   │   ├── QtyStepper.jsx          # botão +/- de cada item
│   │   ├── Checkout.jsx            # formulário de entrega e pagamento
│   │   └── Confirmacao.jsx         # ticket de confirmação do pagamento
│   └── loja/
│       ├── LojaView.jsx            # tela de PIN
│       ├── Fila.jsx                # lista de pedidos pagos
│       └── TicketCard.jsx          # card de cada pedido na fila
```

## Sobre a tipografia

O visual usa **Fraunces** (serifada, elegante) nos títulos e **Inter** no
corpo do texto, com antialiasing forçado via CSS (`-webkit-font-smoothing`,
`text-rendering: optimizeLegibility`) para evitar o serrilhado que aparecia
antes — principalmente em fontes condensadas exibidas em tamanho pequeno.

## Como testar

Este é um protótipo de front-end, sem backend real. Para rodar localmente,
crie um projeto React (ex: `npm create vite@latest meu-app -- --template react`),
instale `lucide-react`, e copie estes arquivos para dentro de `src/`,
importando `App.jsx` no `main.jsx`.

Pagamento e status são simulados; os pedidos ficam guardados em um
armazenamento temporário (`window.storage`) só para demonstrar o fluxo de
"pedido pago aparece na tela da loja" durante a apresentação.
