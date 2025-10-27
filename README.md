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
cp env.example .env
# edite o arquivo .env com as credenciais do MongoDB e, se desejar, a chave da OpenAI
npm run dev
```

O estúdio estará disponível em `http://localhost:3000`.

## Variáveis de ambiente

| Variável | Descrição |
| --- | --- |
| `MONGODB_URI` | URL de conexão com o MongoDB (obrigatório) |
| `OPENAI_API_KEY` | (Opcional) chave para geração de voz com o modelo Text-to-Speech da OpenAI |
| `NODE_ENV` | Ambiente de execução (development, production, test) |

## Docker Compose

A aplicação inclui um ambiente completo para desenvolvimento com Docker Compose.

### Início Rápido

```bash
# Usando docker compose diretamente
docker compose up -d

# OU usando o script auxiliar (recomendado)
./docker-dev.sh start
```

### Script de Gerenciamento Docker

O projeto inclui um script `docker-dev.sh` para facilitar o gerenciamento:

```bash
# Comandos disponíveis
./docker-dev.sh start         # Inicia os containers
./docker-dev.sh stop          # Para os containers
./docker-dev.sh restart       # Reinicia os containers
./docker-dev.sh logs web      # Ver logs do web
./docker-dev.sh logs mongodb  # Ver logs do MongoDB
./docker-dev.sh status        # Ver status e recursos
./docker-dev.sh shell web     # Abrir shell no container web
./docker-dev.sh mongo         # Conectar ao MongoDB
./docker-dev.sh rebuild       # Reconstruir tudo do zero
./docker-dev.sh clean         # Limpar tudo (cuidado!)
```

### Serviços Provisionados

- **web**: aplicação Next.js em modo desenvolvimento
  - Porta: `3000`
  - Hot reload habilitado
  - Volumes sincronizados para desenvolvimento

- **mongodb**: banco de dados MongoDB 7
  - Porta: `27017`
  - Volume persistente: `locutorai_mongodb_data`
  - Healthcheck configurado

### URLs de Acesso

- **Aplicação Web**: http://localhost:3000
- **MongoDB**: mongodb://localhost:27017/locutorai

### Melhorias do Docker

- ✅ Healthcheck do MongoDB para garantir que está pronto antes de iniciar a aplicação
- ✅ Network isolada para os serviços
- ✅ Volumes nomeados para melhor organização
- ✅ Restart automático dos containers
- ✅ Hot reload funcionando no desenvolvimento
- ✅ Script auxiliar para gerenciamento fácil

## Estrutura principal

- `app/`: rotas, layout e APIs do Next.js (App Router)
- `components/`: componentes reutilizáveis e elementos de UI
- `lib/`: utilitários, configurações de banco e catálogos de vozes e trilhas
- `public/`: pasta reservada para assets gerados em tempo de execução (ex.: arquivos criados pela API)

## Geração de voz

Sem a variável `OPENAI_API_KEY`, a API retorna amostras sintéticas embutidas em `lib/audio-samples.json`, mantendo o repositório livre de arquivos binários. Ao fornecer a chave, o endpoint `/api/generate` utiliza a API da OpenAI para produzir a voz conforme o texto enviado, salvando o arquivo no diretório `public/generated`.

### Vozes compatíveis com OpenAI

O sistema automaticamente mapeia as vozes para as vozes oficiais do OpenAI TTS:
- `alloy`, `echo`, `fable`, `onyx`, `nova`, `shimmer`

Se uma voz personalizada não for compatível, o sistema utilizará `alloy` como padrão.

## Melhorias implementadas

- ✅ **Tratamento de erros robusto**: Todas as APIs possuem try-catch e logs detalhados
- ✅ **Validação de vozes**: Verifica se a voz solicitada é compatível com a API do OpenAI
- ✅ **Cache otimizado**: Conexão MongoDB com pool de conexões e detecção de estado
- ✅ **Loading states**: Indicadores de carregamento em todos os componentes interativos
- ✅ **Error boundaries**: Captura e exibição amigável de erros em componentes React
- ✅ **Barra de progresso**: Visualização do progresso da reprodução de áudio
- ✅ **Revalidação automática**: API de projetos com cache e revalidação inteligente
- ✅ **TypeScript robusto**: Configuração completa com path aliases e tipos corretos

## Arquitetura

### Frontend
- Next.js 14 (App Router)
- React 18 com hooks e componentes de classe para error boundary
- Tailwind CSS para estilização
- shadcn/ui para componentes de interface

### Backend
- API Routes do Next.js
- MongoDB com Mongoose para persistência
- OpenAI API para Text-to-Speech
- Sistema de cache para otimização de conexões

### Segurança e Boas Práticas
- Validação de entrada com Zod
- Variáveis de ambiente para credenciais
- Tratamento de erros em todas as camadas
- Logs estruturados para debugging
