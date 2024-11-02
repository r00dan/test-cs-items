# test-cs-items

## Environment Variables

### Database Configuration
- `POSTGRES_HOST`: Host address for PostgreSQL access.
- `POSTGRES_PORT`: Port number for PostgreSQL access.
- `POSTGRES_USER`: Username for the database.
- `POSTGRES_PASSWORD`: Password for the specified user.
- `POSTGRES_NAME`: Name of the database to use.
- `REDIS_HOST`: Host address for Redis access.
- `REDIS_PORT`: Port number for Redis access.

### Application Configuration
- `BIND`: Port number the app is running on.
- `SESSION_SECRET`: Secret key for signing cookies.

You can set these variables in a `.env` file located in the project root directory.

## Getting Started

Follow these steps to build and run the project:

1. **Create a Docker network**:
```bash
$ docker network create -d bridge cs-network
```

2. **Build the container**:
```bash
$ docker compose build --no-cache
```

3. **Start the container**:
```bash
$ docker compose up -d
```
