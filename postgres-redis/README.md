# PostgreSQL + Redis Stack

A development stack with PostgreSQL, Redis, and web-based management UIs.

## Services

| Service  | Port | Description                  |
|----------|------|------------------------------|
| postgres | 5432 | PostgreSQL 16 database       |
| redis    | 6379 | Redis 7 in-memory store      |
| adminer  | 8080 | Database web UI              |
| pgadmin  | 5050 | PostgreSQL administration UI |

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

- **Adminer**: http://localhost:8080
  - System: PostgreSQL
  - Server: postgres
  - Username: appuser (or your POSTGRES_USER)
  - Password: changeme (or your POSTGRES_PASSWORD)
  - Database: appdb (or your POSTGRES_DB)

- **pgAdmin**: http://localhost:5050
  - Email: admin@example.com (or your PGADMIN_EMAIL)
  - Password: changeme (or your PGADMIN_PASSWORD)
  - Add server with hostname `postgres`, port `5432`

- **PostgreSQL** (direct connection):
  ```bash
  psql -h localhost -U appuser -d appdb
  ```

- **Redis** (direct connection):
  ```bash
  redis-cli -a changeme
  ```

## Default Credentials

| Service    | Username/Email      | Password |
|------------|---------------------|----------|
| PostgreSQL | appuser             | changeme |
| Redis      | (no username)       | changeme |
| pgAdmin    | admin@example.com   | changeme |

## Stopping and Cleaning Up

```bash
# Stop services (preserves data)
docker compose down

# Stop and remove all data volumes
docker compose down -v
```
