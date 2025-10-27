#!/bin/bash

# Script de gerenciamento Docker para desenvolvimento

set -e

COLOR_GREEN='\033[0;32m'
COLOR_BLUE='\033[0;34m'
COLOR_YELLOW='\033[1;33m'
COLOR_RED='\033[0;31m'
COLOR_NC='\033[0m' # No Color

function print_status() {
    echo -e "${COLOR_BLUE}ℹ️  $1${COLOR_NC}"
}

function print_success() {
    echo -e "${COLOR_GREEN}✅ $1${COLOR_NC}"
}

function print_warning() {
    echo -e "${COLOR_YELLOW}⚠️  $1${COLOR_NC}"
}

function print_error() {
    echo -e "${COLOR_RED}❌ $1${COLOR_NC}"
}

case "$1" in
    start|up)
        print_status "Iniciando containers Docker..."
        docker compose up -d
        print_success "Containers iniciados!"
        echo ""
        docker compose ps
        echo ""
        print_status "Aplicação disponível em: http://localhost:3000"
        print_status "MongoDB disponível em: mongodb://localhost:27017/locutorai"
        ;;
    
    stop|down)
        print_status "Parando containers Docker..."
        docker compose down
        print_success "Containers parados!"
        ;;
    
    restart)
        print_status "Reiniciando containers Docker..."
        docker compose restart
        print_success "Containers reiniciados!"
        ;;
    
    logs)
        SERVICE="${2:-web}"
        print_status "Exibindo logs do serviço: $SERVICE"
        docker compose logs -f "$SERVICE"
        ;;
    
    build)
        print_status "Reconstruindo containers..."
        docker compose build --no-cache
        print_success "Build concluído!"
        ;;
    
    rebuild)
        print_status "Parando e reconstruindo containers..."
        docker compose down
        docker compose build --no-cache
        docker compose up -d
        print_success "Containers reconstruídos e iniciados!"
        ;;
    
    clean)
        print_warning "Isso irá remover todos os containers, volumes e dados!"
        read -p "Tem certeza? (s/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Ss]$ ]]; then
            print_status "Limpando tudo..."
            docker compose down -v
            docker system prune -f
            print_success "Limpeza concluída!"
        else
            print_status "Operação cancelada."
        fi
        ;;
    
    status)
        print_status "Status dos containers:"
        docker compose ps
        echo ""
        print_status "Uso de recursos:"
        docker stats --no-stream $(docker compose ps -q)
        ;;
    
    shell)
        SERVICE="${2:-web}"
        print_status "Abrindo shell no container: $SERVICE"
        docker compose exec "$SERVICE" /bin/sh
        ;;
    
    mongo)
        print_status "Conectando ao MongoDB..."
        docker compose exec mongodb mongosh locutorai
        ;;
    
    *)
        echo "Script de Gerenciamento Docker - LocutorAI"
        echo ""
        echo "Uso: ./docker-dev.sh [comando]"
        echo ""
        echo "Comandos disponíveis:"
        echo "  start, up      - Inicia os containers"
        echo "  stop, down     - Para os containers"
        echo "  restart        - Reinicia os containers"
        echo "  logs [serviço] - Exibe logs (padrão: web)"
        echo "  build          - Reconstrói as imagens"
        echo "  rebuild        - Para, reconstrói e inicia"
        echo "  clean          - Remove tudo (containers, volumes, dados)"
        echo "  status         - Exibe status e uso de recursos"
        echo "  shell [serviço]- Abre shell no container (padrão: web)"
        echo "  mongo          - Conecta ao MongoDB"
        echo ""
        echo "Exemplos:"
        echo "  ./docker-dev.sh start"
        echo "  ./docker-dev.sh logs web"
        echo "  ./docker-dev.sh logs mongodb"
        echo "  ./docker-dev.sh shell web"
        echo "  ./docker-dev.sh mongo"
        ;;
esac

