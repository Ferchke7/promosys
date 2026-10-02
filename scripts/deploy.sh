#!/usr/bin/env bash
set -euo pipefail

# ==============================================================================
# Zero-Downtime Deployment Script for PROMSYS
# ==============================================================================

DEPLOY_DIR="${1:-/home/ferdavs/procsys/promosys}"
cd "$DEPLOY_DIR"

echo "=== [1/5] Preparing deployment in $DEPLOY_DIR ==="

# Build the new image with temporary tag
echo "=== [2/5] Building new Docker image (promosys:next) ==="
docker build -t promosys:next -f Dockerfile .

# Determine standby port and container name
STANDBY_CONTAINER="promosys_standby_$(date +%s)"
STANDBY_PORT=3001

# Find a free standby port
while lsof -Pi :$STANDBY_PORT -sTCP:LISTEN -t >/dev/null 2>&1 || docker ps --format '{{.Ports}}' | grep -q ":$STANDBY_PORT->"; do
  STANDBY_PORT=$((STANDBY_PORT + 1))
done

echo "=== [3/5] Starting standby container on port $STANDBY_PORT ==="
docker run -d \
  --name "$STANDBY_CONTAINER" \
  --restart unless-stopped \
  -p "127.0.0.1:$STANDBY_PORT:3000" \
  --env NODE_ENV=production \
  --env PORT=3000 \
  --env HOST=0.0.0.0 \
  promosys:next

# Health check with retries for ~90 seconds (45 iterations * 2 seconds)
echo "=== [4/5] Running health-check on standby container (up to 90s) ==="
MAX_ATTEMPTS=45
ATTEMPT=0
HEALTHY=false

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
  HTTP_CODE=$(curl -fsS -o /dev/null -w '%{http_code}' "http://127.0.0.1:$STANDBY_PORT/" 2>/dev/null || true)
  if [ "$HTTP_CODE" = "200" ]; then
    echo " Standby container is healthy! HTTP code: $HTTP_CODE (attempt $((ATTEMPT + 1)))"
    HEALTHY=true
    break
  fi
  ATTEMPT=$((ATTEMPT + 1))
  sleep 2
done

if [ "$HEALTHY" != "true" ]; then
  echo "❌ Health check failed after ~90s! Last HTTP code: $HTTP_CODE"
  echo "=== Container logs (last 100 lines) ==="
  docker logs --tail=100 "$STANDBY_CONTAINER" || true
  echo "Stopping failed standby container..."
  docker rm -f "$STANDBY_CONTAINER" || true
  exit 1
fi

echo "=== [5/5] Performing Zero-Downtime switch to production ==="
# Retag image as latest
docker tag promosys:next promosys:latest

# Bring up docker-compose with the new image (fast restart)
docker compose up -d --remove-orphans

# Stop the standby container
docker rm -f "$STANDBY_CONTAINER" || true

# Final verification on main port 3000
FINAL_CHECK=$(curl -fsS -o /dev/null -w '%{http_code}' http://localhost:3000/ 2>/dev/null || true)
if [ "$FINAL_CHECK" != "200" ]; then
  echo "❌ Error: Main port check failed with HTTP code: $FINAL_CHECK"
  docker compose logs --tail=100 promosys
  exit 1
fi

echo "✅ PROMSYS successfully deployed with 0-downtime! (HTTP 200 on http://localhost:3000/)"
