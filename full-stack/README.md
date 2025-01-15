# Full Stack Dev Environment

A ready-to-use development environment with Nginx reverse proxy, PostgreSQL, Redis, and Adminer. Use this as a starting point for any web application project.

## Services

| Service  | Port | Description                     |
|----------|------|---------------------------------|
| nginx    | 80   | Reverse proxy                   |
| postgres | 5432 | PostgreSQL 16 database          |
| redis    | 6379 | Redis 7 in-memory store         |
| adminer  | 8080 | Database web UI                 |

## Quick Start

```bash
# Copy and configure environment variables
cp .env.example .env

# Start all services
docker compose up -d

# Check status
docker compose ps
```

## Accessing Services

- **Nginx**: http://localhost
  - Proxies `/api/` requests to your backend (configure in `nginx/default.conf`)
  - Health check at http://localhost/health

- **Adminer**: http://localhost:8080
  - System: PostgreSQL
  - Server: fullstack-postgres
  - Username: appuser (or your POSTGRES_USER)
  - Password: changeme (or your POSTGRES_PASSWORD)

- **PostgreSQL** (direct):
  ```bash
  psql -h localhost -U appuser -d appdb
  ```

- **Redis** (direct):
  ```bash
  redis-cli -a changeme
  ```

## Customizing the Nginx Config

Edit `nginx/default.conf` to match your setup:

- **Proxy to a backend API**: Update the `upstream backend_api` block with your backend service address
- **Serve static files**: Uncomment the static file serving block in `location /`
- **Proxy to a frontend dev server**: Uncomment the frontend proxy line and adjust the port

After making changes:
```bash
docker compose restart nginx
```

## Adding Your Own Services

Add your backend or frontend service to `docker-compose.yml`:

```yaml
services:
  backend:
    build: ../path-to-your-backend
    environment:
      DATABASE_URL: postgresql://appuser:changeme@fullstack-postgres:5432/appdb
      REDIS_URL: redis://:changeme@fullstack-redis:6379
    networks:
      - backend
      - frontend
```

Then update `nginx/default.conf` to proxy to it.

## Default Credentials

| Service    | Username | Password |
|------------|----------|----------|
| PostgreSQL | appuser  | changeme |
| Redis      | (none)   | changeme |

## Stopping and Cleaning Up

```bash
# Stop services (preserves data)
docker compose down

# Stop and remove all data volumes
docker compose down -v
```
