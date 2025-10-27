# LocutorAI

Aplicativo web fullstack para criação de locuções com IA a partir de texto, desenvolvido com Next.js 14, Tailwind CSS, componentes shadcn/ui e MongoDB. A solução oferece estúdio de produção com escolha de voz sintética, trilha sonora de fundo e histórico das locuções geradas.

## Pré-requisitos

- Node.js 18 ou superior
- npm
- MongoDB (local ou serviço gerenciado)
- Opcional: chave da API OpenAI para geração de voz em tempo real (`OPENAI_API_KEY`)

## Configuração local

```bash
npm install
cp .env.example .env.local
# edite o arquivo .env.local com as credenciais do MongoDB e, se desejar, a chave da OpenAI
npm run dev
```

O estúdio estará disponível em `http://localhost:3000`.

## Variáveis de ambiente

| Variável | Descrição |
| --- | --- |
| `MONGODB_URI` | URL de conexão com o MongoDB |
| `OPENAI_API_KEY` | (Opcional) chave para geração de voz com o modelo `gpt-4o-mini-tts` |

## Docker Compose

A aplicação inclui um ambiente pronto para desenvolvimento com Docker Compose.

```bash
docker compose up --build
```

Serviços provisionados:

- `web`: aplicação Next.js executando em modo desenvolvimento
- `mongodb`: banco MongoDB com armazenamento persistente no volume `mongodb_data`

A interface web ficará disponível em `http://localhost:3000` e o MongoDB em `mongodb://localhost:27017/locutorai`.

## Estrutura principal

- `app/`: rotas, layout e APIs do Next.js (App Router)
- `components/`: componentes reutilizáveis e elementos de UI
- `lib/`: utilitários, configurações de banco e catálogos de vozes e trilhas
- `public/`: pasta reservada para assets gerados em tempo de execução (ex.: arquivos criados pela API)

## Geração de voz

Sem a variável `OPENAI_API_KEY`, a API retorna amostras sintéticas embutidas em `lib/audio-samples.json`, mantendo o repositório livre de arquivos binários. Ao fornecer a chave, o endpoint `/api/generate` utiliza a API da OpenAI para produzir a voz conforme o texto enviado, salvando o arquivo no diretório `public/generated`.
