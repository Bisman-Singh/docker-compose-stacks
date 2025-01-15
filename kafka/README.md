# Kafka Stack

A development Kafka stack running in KRaft mode (no Zookeeper dependency) with Schema Registry and a web UI for topic management.

## Services

| Service         | Port | Description                     |
|-----------------|------|---------------------------------|
| kafka           | 9094 | Kafka broker (external access)  |
| schema-registry | 8085 | Confluent Schema Registry       |
| kafka-ui        | 8080 | Web UI for Kafka management     |

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

- **Kafka UI**: http://localhost:8080
  - No authentication required
  - Browse topics, consumer groups, and schemas

- **Kafka broker** (from host):
  ```
  localhost:9094
  ```

- **Schema Registry**:
  ```
  http://localhost:8085
  ```

## Working with Topics

```bash
# Create a topic
docker exec kafka kafka-topics.sh \
  --bootstrap-server localhost:9092 \
  --create --topic my-topic \
  --partitions 3 --replication-factor 1

# List topics
docker exec kafka kafka-topics.sh \
  --bootstrap-server localhost:9092 --list

# Produce messages
docker exec -it kafka kafka-console-producer.sh \
  --bootstrap-server localhost:9092 --topic my-topic

# Consume messages
docker exec -it kafka kafka-console-consumer.sh \
  --bootstrap-server localhost:9092 --topic my-topic \
  --from-beginning
```

## Connecting from Applications

Use the external listener for applications running outside Docker:

```
bootstrap.servers=localhost:9094
```

For services running inside the same Docker network:

```
bootstrap.servers=kafka:9092
```

## Stopping and Cleaning Up

```bash
# Stop services (preserves data)
docker compose down

# Stop and remove all data volumes
docker compose down -v
```
