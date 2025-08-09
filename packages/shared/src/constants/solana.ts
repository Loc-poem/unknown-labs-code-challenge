  /**
   * Solana RPC endpoints configuration
   * These endpoints can be used across the monorepo for Solana blockchain interactions
   */

  // Default Solana RPC endpoints
  export const SOLANA_RPC_ENDPOINTS = {
    MAINNET: 'https://api.mainnet-beta.solana.com',
    DEVNET: 'https://api.devnet.solana.com',
    TESTNET: 'https://api.testnet.solana.com',
  } as const;

  // Network configuration
  export const SOLANA_NETWORKS = {
    MAINNET: {
      name: 'Mainnet Beta',
      rpcUrl: SOLANA_RPC_ENDPOINTS.MAINNET,
      explorerUrl: 'https://solscan.io',
      chainId: 'mainnet-beta',
    },
    DEVNET: {
      name: 'Devnet',
      rpcUrl: SOLANA_RPC_ENDPOINTS.DEVNET,
      explorerUrl: 'https://solscan.io/?cluster=devnet',
      chainId: 'devnet',
    },
    TESTNET: {
      name: 'Testnet',
      rpcUrl: SOLANA_RPC_ENDPOINTS.TESTNET,
      explorerUrl: 'https://solscan.io/?cluster=testnet',
      chainId: 'testnet',
    },
  } as const;

  export type SolanaNetwork = keyof typeof SOLANA_NETWORKS;
