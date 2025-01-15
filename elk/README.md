# ELK Stack (Elasticsearch + Logstash + Kibana)

A development ELK stack for log aggregation and analysis. Runs in single-node mode with security disabled for local development.

## Services

| Service       | Port      | Description                        |
|---------------|-----------|------------------------------------|
| elasticsearch | 9200/9300 | Search and analytics engine        |
| logstash      | 5044/5000 | Log processing pipeline            |
| kibana        | 5601      | Visualization and exploration UI   |

## Quick Start

```bash
# Copy and configure environment variables
cp .env.example .env

# Start all services
docker compose up -d

# Check status (Kibana may take 1-2 minutes to start)
docker compose ps
```

## Accessing Services

- **Kibana**: http://localhost:5601
  - No authentication required (dev mode)
  - Go to "Discover" to explore ingested logs

- **Elasticsearch**: http://localhost:9200
  - Check cluster health: `curl http://localhost:9200/_cluster/health?pretty`
  - List indices: `curl http://localhost:9200/_cat/indices?v`

## Sending Logs

Send JSON logs to Logstash via TCP on port 5000:

```bash
echo '{"message": "test log entry", "level": "info"}' | nc localhost 5000
```

Or configure your application's logging driver:

```yaml
# In another docker-compose.yml
services:
  my-app:
    logging:
      driver: syslog
      options:
        syslog-address: "tcp://localhost:5000"
```

## Memory Configuration

The ELK stack can be memory-intensive. Default limits are set conservatively for local development:

| Service       | Heap Size | Memory Limit |
|---------------|-----------|--------------|
| Elasticsearch | 512m      | 1g           |
| Logstash      | 256m      | 512m         |
| Kibana        | --        | 512m         |

Adjust these in `.env` if you need more capacity.

## Stopping and Cleaning Up

```bash
# Stop services (preserves data)
docker compose down

# Stop and remove all data volumes
docker compose down -v
```
