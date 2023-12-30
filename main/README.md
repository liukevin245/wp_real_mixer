# Run the project

## Install dependencies

```bash
yarn
```

## Environment variables

Create a `.env.local` file in the root of the project and add the following variables:

```bash
POSTGRES_URL=postgres://postgres:postgres@localhost:5432/final

AUTH_SECRET=

NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Database

1. Start database

```bash
docker compose up -d
```

2. Run migrations

```bash
yarn migrate
```

## Start the server

```bash
yarn dev
```