# Monitoring Stack (Prometheus + Grafana)

A complete monitoring stack with Prometheus for metrics collection, Grafana for visualization, Node Exporter for host metrics, and cAdvisor for container metrics.

## Services

| Service       | Port | Description                        |
|---------------|------|------------------------------------|
| prometheus    | 9090 | Metrics collection and storage     |
| grafana       | 3000 | Metrics visualization dashboards   |
| node-exporter | 9100 | Host system metrics (internal)     |
| cadvisor      | 8080 | Container metrics (internal)       |

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

- **Grafana**: http://localhost:3000
  - Username: admin (or your GRAFANA_ADMIN_USER)
  - Password: changeme (or your GRAFANA_ADMIN_PASSWORD)
  - Prometheus datasource is auto-provisioned

- **Prometheus**: http://localhost:9090
  - No authentication required
  - Use the "Targets" page to verify all scrapers are healthy

## Pre-configured Scrape Targets

Prometheus is configured to scrape:
- Itself (prometheus:9090)
- Node Exporter (node-exporter:9100) for host metrics
- cAdvisor (cadvisor:8080) for container metrics

## Adding Custom Scrape Targets

Edit `prometheus/prometheus.yml` and add a new job under `scrape_configs`:

```yaml
- job_name: "my-app"
  static_configs:
    - targets: ["my-app:8080"]
```

Then reload Prometheus:
```bash
curl -X POST http://localhost:9090/-/reload
```

## Default Credentials

| Service  | Username | Password |
|----------|----------|----------|
| Grafana  | admin    | changeme |

## Stopping and Cleaning Up

```bash
# Stop services (preserves data)
docker compose down

# Stop and remove all data volumes
docker compose down -v
```
