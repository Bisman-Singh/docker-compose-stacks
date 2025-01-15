# Docker Compose Stacks

A collection of ready-to-use Docker Compose files for common development environments. Each stack is self-contained with its own configuration, environment variables, and documentation.

## Stacks

| Stack | Services | Ports | Use Case |
|-------|----------|-------|----------|
| [postgres-redis](./postgres-redis/) | PostgreSQL 16, Redis 7, Adminer, pgAdmin | 5432, 6379, 8080, 5050 | Backend development with relational DB and cache |
| [monitoring](./monitoring/) | Prometheus, Grafana, Node Exporter, cAdvisor | 9090, 3000 | Infrastructure and container monitoring |
| [elk](./elk/) | Elasticsearch 8, Logstash, Kibana | 9200, 5044, 5000, 5601 | Log aggregation, search, and analysis |
| [mongodb](./mongodb/) | MongoDB 7, Mongo Express | 27017, 8081 | Document database development |
| [kafka](./kafka/) | Kafka (KRaft), Schema Registry, Kafka UI | 9094, 8085, 8080 | Event streaming and messaging |
| [full-stack](./full-stack/) | Nginx, PostgreSQL 16, Redis 7, Adminer | 80, 5432, 6379, 8080 | Complete web app starting point |

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+, included with Docker Desktop)

## Quick Start

Each stack follows the same pattern:

```bash
# Navigate to the stack you want
cd <stack-name>/

# Copy the example env file
cp .env.example .env

# Start the stack
docker compose up -d

# Check service status
docker compose ps

# View logs
docker compose logs -f

# Stop the stack (preserves data)
docker compose down

# Stop and remove all data
docker compose down -v
```

### postgres-redis

```bash
cd postgres-redis && cp .env.example .env && docker compose up -d
```
PostgreSQL on `localhost:5432`, Redis on `localhost:6379`, Adminer at http://localhost:8080, pgAdmin at http://localhost:5050

### monitoring

```bash
cd monitoring && cp .env.example .env && docker compose up -d
```
Grafana at http://localhost:3000 (admin/changeme), Prometheus at http://localhost:9090

### elk

```bash
cd elk && cp .env.example .env && docker compose up -d
```
Kibana at http://localhost:5601, Elasticsearch at http://localhost:9200

### mongodb

```bash
cd mongodb && cp .env.example .env && docker compose up -d
```
MongoDB on `localhost:27017`, Mongo Express at http://localhost:8081

### kafka

```bash
cd kafka && cp .env.example .env && docker compose up -d
```
Kafka on `localhost:9094`, Kafka UI at http://localhost:8080, Schema Registry at http://localhost:8085

### full-stack

```bash
cd full-stack && cp .env.example .env && docker compose up -d
```
Nginx at http://localhost, PostgreSQL on `localhost:5432`, Redis on `localhost:6379`, Adminer at http://localhost:8080

## Default Credentials

All stacks use `changeme` as the default password. See each stack's `.env.example` for the full list of configurable values. Always change defaults before using in any shared or non-local environment.

## Tips

- **Port conflicts**: If a port is already in use, edit the port mapping in `docker-compose.yml` (e.g., change `"8080:8080"` to `"8888:8080"`)
- **Persistent data**: All stacks use named Docker volumes. Data survives `docker compose down` but is removed with `docker compose down -v`
- **Combining stacks**: To run multiple stacks together, ensure there are no port conflicts and consider using a shared external network
- **Resource limits**: The ELK stack has memory limits configured. Adjust them in `.env` if services are running out of memory
