# Kong API Gateway Setup for Parkealo

This directory contains the Docker Compose configuration and declarative configuration for Kong API Gateway.

## Overview

Kong is used as the API Gateway for the Parkealo platform, providing:
- Request routing and load balancing
- Authentication and authorization
- Rate limiting and throttling
- Request/response transformation
- API versioning and documentation
- Monitoring and analytics

## Architecture

The Kong setup consists of:
1. **Kong Gateway**: The main API gateway
2. **PostgreSQL Database**: Stores Kong's configuration
3. **Redis**: Used for rate limiting and caching
4. **Konga** (Optional): Web-based admin UI for Kong

## Quick Start

### 1. Start Kong Services

```bash
# Start Kong API Gateway with all services
docker-compose -f docker/docker-compose-api-gateway.yml up -d

# Start Kong with Konga admin UI (optional)
docker-compose -f docker/docker-compose-api-gateway.yml --profile with-konga up -d
```

### 2. Verify Kong is Running

```bash
# Check Kong health
curl http://localhost:8001/health

# Check Kong proxy is accessible
curl http://localhost:8000/health
```

### 3. Access Admin Interfaces

- **Kong Admin API**: http://localhost:8001
- **Kong Manager UI**: http://localhost:8002
- **Konga Admin UI** (if enabled): http://localhost:1337

## Configuration

### Environment Variables

All Kong configuration is managed through environment variables in `.env.example`. Key variables include:

```bash
# Database Configuration
KONG_PG_DATABASE=kong
KONG_PG_USER=kong
KONG_PG_PASSWORD=kong
KONG_PG_PORT=5432

# Port Configuration
KONG_PROXY_PORT=8000      # API traffic
KONG_ADMIN_PORT=8001      # Admin API
KONG_ADMIN_GUI_PORT=8002  # Kong Manager UI
KONGA_PORT=1337          # Konga UI (optional)

# Security
KONG_ADMIN_GUI_SECRET=change-me-please
KONGA_TOKEN_SECRET=change-me-please
```

### Declarative Configuration

The initial Kong configuration is defined in `docker/kong/declarative/kong.yml`. This file includes:

1. **Services**: Backend services that Kong will proxy to
2. **Routes**: URL paths that map to services
3. **Plugins**: Global plugins (CORS, rate limiting, etc.)
4. **Consumers**: API consumers with access control

## Services and Routes

The initial configuration includes example services:

### Health Service
- **Route**: `/health`
- **Service**: Kong Admin API (for monitoring)

### User Service (Example)
- **Route**: `/api/v1/users`, `/api/v1/users/*`
- **Service**: `user-service:3001` (to be updated with actual service)

### Authentication Service (Example)
- **Route**: `/api/v1/auth`, `/api/v1/auth/*`
- **Service**: `auth-service:3000` (to be updated with actual service)

## Plugins

### Global Plugins
1. **CORS**: Cross-Origin Resource Sharing for development
2. **Rate Limiting**: 60 requests/minute, 1000/hour, 10000/day
3. **Request Transformer**: Adds X-Forwarded headers
4. **ACL**: Access Control Lists for consumer groups

### Consumer Groups
- **web-clients**: Parkealo web application
- **mobile-clients**: Parkealo mobile applications
- **internal-services**: Internal microservices

## Network Configuration

Kong connects to two networks:
1. **kong-network**: Internal network for Kong services
2. **parkealo-network**: External network connecting to other Parkealo services

## Management

### Using Kong Admin API

```bash
# List all services
curl http://localhost:8001/services

# List all routes
curl http://localhost:8001/routes

# List all plugins
curl http://localhost:8001/plugins

# Add a new service
curl -X POST http://localhost:8001/services \
  --data "name=my-service" \
  --data "url=http://my-service:3000"

# Add a route to a service
curl -X POST http://localhost:8001/services/my-service/routes \
  --data "paths[]=/api/v1/my-service"
```

### Using Konga (Optional)

If Konga is enabled, you can manage Kong through the web UI:
1. Open http://localhost:1337
2. Complete the setup wizard
3. Connect to Kong using:
   - Kong Admin URL: http://kong:8001
   - No authentication required for local setup

## Monitoring and Health Checks

### Health Checks
- **Kong Database**: Automatic health check with `pg_isready`
- **Kong Gateway**: Health check with `kong health` command
- **Redis**: Health check with `redis-cli ping`

### Logs
```bash
# View Kong logs
docker logs kong-gateway

# View Kong database logs
docker logs kong-postgres

# View Redis logs
docker logs kong-redis
```

## Troubleshooting

### Common Issues

1. **Kong fails to start**
   ```bash
   # Check database connection
   docker logs kong-migration

   # Check Kong logs
   docker logs kong-gateway
   ```

2. **Database migration issues**
   ```bash
   # Reset and restart
   docker-compose -f docker/docker-compose-api-gateway.yml down -v
   docker-compose -f docker/docker-compose-api-gateway.yml up -d
   ```

3. **Port conflicts**
   - Check if ports 8000, 8001, 8002, 5432, or 6380 are already in use
   - Update port mappings in `.env` file

### Debug Commands

```bash
# Check container status
docker ps | grep kong

# Check network connectivity
docker network inspect kong-network
docker network inspect parkealo-network

# Test Kong API endpoints
curl -v http://localhost:8001/health
curl -v http://localhost:8000/health
```

## Integration with Parkealo Services

To integrate Kong with Parkealo microservices:

1. Update service URLs in `docker/kong/declarative/kong.yml`
2. Ensure services are on the `parkealo-network`
3. Configure authentication plugins as needed
4. Set up rate limiting per service

## Security Considerations

### Production Deployment

For production deployment:
1. Change all default passwords and secrets
2. Enable SSL/TLS for all endpoints
3. Configure proper authentication and authorization
4. Set up monitoring and alerting
5. Implement backup and recovery procedures

### Secrets Management
- Store secrets in a secure vault (not in version control)
- Use environment variables for sensitive data
- Rotate secrets regularly

## Next Steps

1. **Integrate with actual services**: Update service URLs in declarative config
2. **Configure authentication**: Set up JWT or OAuth2 plugins
3. **Set up monitoring**: Integrate with Prometheus/Grafana
4. **Implement CI/CD**: Automate Kong configuration updates
5. **Load testing**: Test Kong performance under load

## References

- [Kong Documentation](https://docs.konghq.com/)
- [Kong Docker Images](https://hub.docker.com/_/kong)
- [Konga Documentation](https://github.com/pantsel/konga)
- [Kong Declarative Configuration](https://docs.konghq.com/gateway/latest/production/deployment-topologies/db-less-and-declarative-config/)

