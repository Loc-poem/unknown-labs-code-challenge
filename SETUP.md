# Solana Block Explorer Setup

This project consists of a NextJS frontend and NestJS API backend for exploring Solana blockchain data.

## Prerequisites

Make sure you have [pnpm](https://pnpm.io/) installed:
```bash
npm install -g pnpm
```

## Quick Start

### Option 1: Start Both Services Together (Recommended)
```bash
# Install all dependencies
pnpm install

# Start both API and frontend in development mode
pnpm dev
```

### Option 2: Start Services Individually

#### Start API Only
```bash
pnpm dev:api
```
The API will run on **http://localhost:3002**

#### Start Frontend Only  
```bash
pnpm dev:web
```
The frontend will run on **http://localhost:3000**

### Option 3: Manual Setup (if you prefer)
```bash
# Install dependencies for all packages
pnpm install

# Start API
cd packages/api
pnpm start:dev

# In another terminal, start frontend
cd packages/web  
pnpm dev
```

## Production Build & Deployment

### Build Both Services
```bash
# Build both API and frontend
pnpm build

# Or build individually
pnpm build:api  # Build API only
pnpm build:web  # Build frontend only
```

### Start Production Services
```bash
# Start both services in production mode
pnpm start

# Or start individually  
pnpm start:api  # Start API in production mode
pnpm start:web  # Start frontend in production mode
```

### Complete Production Workflow
```bash
# Build and start API in production
pnpm prod:api

# Build and start frontend in production  
pnpm prod:web

# Build and start both in production
pnpm prod
```

## Available Scripts

All scripts can be run from the root directory:

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start both API and frontend in development mode |
| `pnpm dev:api` | Start API only in development mode |
| `pnpm dev:web` | Start frontend only in development mode |
| `pnpm build` | Build both API and frontend |
| `pnpm build:api` | Build API only |
| `pnpm build:web` | Build frontend only |
| `pnpm start` | Start both services in production mode |
| `pnpm start:api` | Start API only in production mode |
| `pnpm start:web` | Start frontend only in production mode |
| `pnpm prod` | Build and start both in production mode |
| `pnpm prod:api` | Build and start API in production mode |
| `pnpm prod:web` | Build and start frontend in production mode |

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter a Solana block number (slot) in the input field
3. Click "Get Transaction Count" to fetch the transaction count for that block
4. The result will display the number of transactions in the specified block

## API Endpoint

The frontend connects to the NestJS API at:
- **Base URL**: `http://localhost:3002`
- **Endpoint**: `GET /api/solana/block/{blockNumber}/transactions`

## Architecture

- **Frontend**: NextJS 15 with React 19 and Tailwind CSS
- **Backend**: NestJS with Solana Web3.js integration
- **API Communication**: REST API with JSON responses
- **Package Management**: pnpm workspaces for monorepo management

## Notes

- Make sure both the API and frontend are running simultaneously
- The API uses Solana's mainnet by default
- All dependencies are managed through pnpm workspaces from the root directory
