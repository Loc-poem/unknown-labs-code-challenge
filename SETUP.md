# Solana Block Explorer Setup

This project consists of a NextJS frontend and NestJS API backend for exploring Solana blockchain data.

## Quick Start

### 1. Start the API (Backend)
```bash
cd packages/api
pnpm install
pnpm run start:dev
```
The API will run on **http://localhost:3002**

### 2. Start the Frontend
```bash
cd packages/web
pnpm install
pnpm run dev
```
The frontend will run on **http://localhost:3000**

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter a Solana block number (slot) in the input field
3. Click "Get Transaction Count" to fetch the transaction count for that block
4. The result will display the number of transactions in the specified block

## API Endpoint

The frontend connects to the NestJS API at:
- **Base URL**: `http://localhost:3002`
- **Endpoint**: `GET /api/solana/block/{blockNumber}/transactions`

## Features

- ✅ Modern, responsive UI with dark/light mode support
- ✅ Input validation for block numbers
- ✅ Error handling for invalid blocks or network issues
- ✅ Loading states during API calls
- ✅ CORS enabled for frontend-backend communication

## Architecture

- **Frontend**: NextJS 15 with React 19 and Tailwind CSS
- **Backend**: NestJS with Solana Web3.js integration
- **API Communication**: REST API with JSON responses

## Notes

- Make sure both the API and frontend are running simultaneously
- The API uses Solana's mainnet by default
- Block numbers refer to Solana slots (not traditional block numbers)
