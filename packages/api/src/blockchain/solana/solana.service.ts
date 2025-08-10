import { Injectable, Inject } from '@nestjs/common';
import { web3 } from '@coral-xyz/anchor';

@Injectable()
export class SolanaService {
  constructor(
    @Inject('SOLANA_CONNECTION')
    private readonly solanaConnection: web3.Connection,
  ) {}

  /**
   * Retrieves a block from the Solana blockchain.
   * @param blockNumber - The block number (slot) to query.
   * @returns The block information.
   * @throws Error if the block cannot be retrieved or another error occurs.
   */
  async getBlock(blockNumber: number) {
    const block = await this.solanaConnection.getBlock(blockNumber, {
      commitment: 'finalized',
      transactionDetails: 'full',
      maxSupportedTransactionVersion: 0,
    });

    if (!block) {
      throw new Error(`Block ${blockNumber} not found`);
    }

    return block;
  }

  /**
   * Retrieves the transaction count for a specific Solana block.
   * @param blockNumber - The block number (slot) to query.
   * @returns An object containing the transaction count for the block.
   * @throws Error if the block cannot be retrieved or another error occurs.
   */
  async getBlockTransactionCount(blockNumber: number) {
    try {
      const block = await this.getBlock(blockNumber);
      return {
        transactionCount: block.transactions.length,
      };
    } catch (error) {
      throw new Error(`Failed to get block ${blockNumber}: ${error.message}`);
    }
  }
}