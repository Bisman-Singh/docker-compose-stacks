# MongoDB Stack

A development MongoDB stack with authentication enabled and a web-based management UI.

## Services

| Service       | Port  | Description               |
|---------------|-------|---------------------------|
| mongodb       | 27017 | MongoDB 7 database        |
| mongo-express | 8081  | MongoDB web UI            |

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

- **Mongo Express**: http://localhost:8081
  - Username: admin (or your ME_USERNAME)
  - Password: changeme (or your ME_PASSWORD)

- **MongoDB** (direct connection):
  ```bash
  # Connect as root
  mongosh "mongodb://rootuser:changeme@localhost:27017"

  # Connect as app user to appdb
  mongosh "mongodb://appuser:changeme@localhost:27017/appdb"
  ```

- **Connection string for applications**:
  ```
  mongodb://appuser:changeme@localhost:27017/appdb
  ```

## Seed Data

On first startup, the init script (`mongo-init.js`) creates:
- An application user (`appuser`) with read/write access to `appdb`
- An `items` collection with 3 sample documents
- Indexes on `name` and `category + active`

## Default Credentials

| Service       | Username  | Password |
|---------------|-----------|----------|
| MongoDB root  | rootuser  | changeme |
| MongoDB app   | appuser   | changeme |
| Mongo Express | admin     | changeme |

## Stopping and Cleaning Up

```bash
# Stop services (preserves data)
docker compose down

# Stop and remove all data volumes
docker compose down -v
```
