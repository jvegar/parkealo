# 🚗 Parkealo

**Share your parking space, earn money, and help your community.**

Parkealo is a peer-to-peer parking space sharing platform that connects people who have available parking spaces with those who need them. Our mission is to optimize urban parking utilization while creating economic opportunities for space owners.

## 🌟 Overview

Parkealo transforms underutilized parking spaces into valuable community resources. Whether you have a driveway, garage, or designated parking spot, you can list it on our platform and earn money when others use it. For drivers, Parkealo provides affordable, convenient parking options while reducing the stress of finding parking in busy urban areas.

## 🏗️ Architecture

Parkealo is built using a modern microservices architecture:

- **Frontend**: React 18 with TypeScript, Material-UI, Redux Toolkit
- **Backend**: Node.js with Express.js microservices
- **Database**: PostgreSQL with Redis caching
- **Message Queue**: RabbitMQ for async communication
- **API Gateway**: Centralized entry point with authentication
- **Containerization**: Docker with Docker Compose for local development

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development without Docker)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/jvegar/parkealo.git
cd parkealo
```

### 2. Environment Setup

Copy the environment variables file:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```bash
# Edit the .env file with your preferred editor
nano .env  # or vim, code, etc.
```

### 3. Start with Docker Compose

The easiest way to get started is using Docker Compose:

```bash
# Start all services
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### 4. Access the Application

Once all services are running:

- **Frontend**: http://localhost:3002
- **API Gateway**: http://localhost:3000
- **RabbitMQ Management**: http://localhost:15672
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## 📋 Available Services

| Service | Port | Description |
|---------|------|-------------|
| Frontend | 3002 | React application |
| API Gateway | 3000 | Main API entry point |
| User Service | 3001 | User management service |
| PostgreSQL | 5432 | Primary database |
| Redis | 6379 | Caching and sessions |
| RabbitMQ | 5672 | Message queue |
| RabbitMQ Management | 15672 | Queue management UI |

## 🔧 Development Setup

### Local Development (Without Docker)

If you prefer to run services locally without Docker:

#### Backend Services

```bash
# Install dependencies for API Gateway
cd services/api-gateway
npm install
npm run dev

# Install dependencies for User Service
cd services/user-service
npm install
npm run dev
```

#### Frontend

```bash
# Install frontend dependencies
cd frontend
npm install
npm start
```

### Database Setup

The PostgreSQL database is automatically initialized with:
- Required extensions (uuid-ossp, pgcrypto)
- User management tables
- Proper indexes and constraints

### Redis Configuration

Redis is configured with:
- Password authentication
- Persistence enabled
- Optimized for development

## 🧪 Testing

### Running Tests

```bash
# Run all tests
docker-compose exec api-gateway npm test
docker-compose exec user-service npm test
docker-compose exec frontend npm test

# Run tests with coverage
docker-compose exec api-gateway npm run test:coverage
```

### API Testing

Test the API endpoints:

```bash
# Health check
curl http://localhost:3000/health

# User registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123", "username": "testuser"}'
```

## 📚 Documentation

### API Documentation

API documentation is available at:
- Swagger UI: http://localhost:3000/api-docs
- OpenAPI JSON: http://localhost:3000/api-docs.json

### Project Documentation

- [MVP Roadmap](docs/MVP_ROADMAP.md) - Development phases and timeline
- [Technical Architecture](docs/TECHNICAL_ARCHITECTURE.md) - System design
- [Domain-Driven Design](docs/DOMAIN_DRIVEN_DESIGN.md) - Business logic organization
- [UX Design Guidelines](docs/UX_DESIGN_GUIDELINES.md) - UI/UX principles

## 🔄 Development Workflow

### Branching Strategy

We use Git Flow with the following branches:
- `main` - Production code
- `develop` - Integration branch
- `feature/*` - Feature development
- `release/*` - Release preparation
- `hotfix/*` - Critical fixes

### Commit Convention

We follow conventional commits:
```
type(scope): description

feat(auth): add JWT authentication
fix(api): resolve user registration bug
docs(readme): update installation instructions
```

### Pull Request Process

1. Create feature branch from `develop`
2. Make changes and commit with proper messages
3. Push branch and create pull request
4. Code review by team members
5. Merge to `develop` after approval

## 🐳 Docker Commands

### Useful Docker Commands

```bash
# Build all services
docker-compose build

# Rebuild specific service
docker-compose build api-gateway

# View service logs
docker-compose logs -f api-gateway

# Execute commands in containers
docker-compose exec postgres psql -U parkealo_user -d parkealo_dev
docker-compose exec redis redis-cli -a redis_password

# Clean up everything
docker-compose down -v
```

### Development with Docker

```bash
# Start only database services
docker-compose up postgres redis rabbitmq -d

# Start specific service
docker-compose up api-gateway -d

# Scale services
docker-compose up --scale api-gateway=3 -d
```

## 🔧 Configuration

### Environment Variables

Key environment variables you can configure:

```bash
# Database
POSTGRES_DB=parkealo_dev
POSTGRES_USER=parkealo_user
POSTGRES_PASSWORD=parkealo_password

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# Services
API_GATEWAY_PORT=3000
USER_SERVICE_PORT=3001
FRONTEND_PORT=3002
```

### Service Configuration

Each service can be configured through environment variables. See individual service documentation for detailed configuration options.

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use**: Change ports in `.env` file
2. **Database connection failed**: Check PostgreSQL container status
3. **Redis connection failed**: Verify Redis password in configuration
4. **Build failures**: Clear Docker cache with `docker-compose build --no-cache`

### Getting Help

- Check service logs: `docker-compose logs [service-name]`
- Verify container status: `docker-compose ps`
- Check GitHub Issues for known problems
- Review documentation in `/docs` folder

## 🤝 Contributing

### Getting Started

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

### Code Standards

- Follow ESLint configuration
- Write unit tests for new features
- Document your code
- Follow commit message conventions
- Ensure all tests pass before submitting PR

### Development Guidelines

- Use TypeScript for type safety
- Follow SOLID principles
- Write clean, readable code
- Add proper error handling
- Include logging for debugging

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter issues or have questions:

1. Check the troubleshooting section above
2. Review GitHub Issues for similar problems
3. Create a new issue with detailed information
4. Contact the development team

## 🗺️ Roadmap

See our [MVP Roadmap](docs/MVP_ROADMAP.md) for planned features and development phases.

---

**Happy coding!** 🚀

Built with ❤️ by the Parkealo team