import { Test, TestingModule } from '@nestjs/testing';
import { SolanaService } from './solana.service';
import { web3 } from '@coral-xyz/anchor';

describe('SolanaService', () => {
  let service: SolanaService;
  let mockConnection: jest.Mocked<web3.Connection>;

  const mockBlock = {
    blockhash: 'mock-blockhash',
    blockHeight: 123456,
    blockTime: 1234567890,
    parentSlot: 123455,
    previousBlockhash: 'mock-previous-blockhash',
    transactions: [
      {
        meta: {
          fee: 5000,
          innerInstructions: [],
          logMessages: [],
          postBalances: [1000000000],
          preBalances: [1000005000],
          status: { Ok: null },
        },
        transaction: {
          message: {
            accountKeys: ['mock-account-key'],
            header: {
              numReadonlySignedAccounts: 0,
              numReadonlyUnsignedAccounts: 1,
              numRequiredSignatures: 1,
            },
            instructions: [],
            recentBlockhash: 'mock-recent-blockhash',
          },
          signatures: ['mock-signature'],
        },
      },
      {
        meta: {
          fee: 5000,
          innerInstructions: [],
          logMessages: [],
          postBalances: [2000000000],
          preBalances: [2000005000],
          status: { Ok: null },
        },
        transaction: {
          message: {
            accountKeys: ['mock-account-key-2'],
            header: {
              numReadonlySignedAccounts: 0,
              numReadonlyUnsignedAccounts: 1,
              numRequiredSignatures: 1,
            },
            instructions: [],
            recentBlockhash: 'mock-recent-blockhash',
          },
          signatures: ['mock-signature-2'],
        },
      },
    ],
  };

  beforeEach(async () => {
    // Create a mock connection
    mockConnection = {
      getBlock: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SolanaService,
        {
          provide: 'SOLANA_CONNECTION',
          useValue: mockConnection,
        },
      ],
    }).compile();

    service = module.get<SolanaService>(SolanaService);
  });

  describe('getBlock', () => {
    it('should return block data when block exists', async () => {
      // Arrange
      const blockNumber = 123456;
      mockConnection.getBlock.mockResolvedValue(mockBlock);

      // Act
      const result = await service.getBlock(blockNumber);

      // Assert
      expect(result).toEqual(mockBlock);
      expect(mockConnection.getBlock).toHaveBeenCalledWith(blockNumber, {
        commitment: 'finalized',
        transactionDetails: 'full',
        maxSupportedTransactionVersion: 0,
      });
    });

    it('should throw error when block does not exist', async () => {
      // Arrange
      const blockNumber = 999999;
      mockConnection.getBlock.mockResolvedValue(null);

      // Act & Assert
      await expect(service.getBlock(blockNumber)).rejects.toThrow(
        `Block ${blockNumber} not found`,
      );
      expect(mockConnection.getBlock).toHaveBeenCalledWith(blockNumber, {
        commitment: 'finalized',
        transactionDetails: 'full',
        maxSupportedTransactionVersion: 0,
      });
    });

    it('should propagate connection errors', async () => {
      // Arrange
      const blockNumber = 123456;
      const connectionError = new Error('Connection failed');
      mockConnection.getBlock.mockRejectedValue(connectionError);

      // Act & Assert
      await expect(service.getBlock(blockNumber)).rejects.toThrow(
        connectionError,
      );
    });
  });

  describe('getBlockTransactionCount', () => {
    it('should return transaction count for a valid block', async () => {
      // Arrange
      const blockNumber = 123456;
      mockConnection.getBlock.mockResolvedValue(mockBlock);

      // Act
      const result = await service.getBlockTransactionCount(blockNumber);

      // Assert
      expect(result).toEqual({
        transactionCount: 2,
      });
      expect(result).toHaveProperty('transactionCount');
      expect(typeof result.transactionCount).toBe('number');
      expect(result.transactionCount).toBe(mockBlock.transactions.length);
    });

    it('should return zero transaction count for block with no transactions', async () => {
      // Arrange
      const blockNumber = 123456;
      const emptyBlock = { ...mockBlock, transactions: [] };
      mockConnection.getBlock.mockResolvedValue(emptyBlock);

      // Act
      const result = await service.getBlockTransactionCount(blockNumber);

      // Assert
      expect(result).toEqual({
        transactionCount: 0,
      });
      expect(result.transactionCount).toBe(0);
    });

    it('should throw error with proper message when block does not exist', async () => {
      // Arrange
      const blockNumber = 999999;
      mockConnection.getBlock.mockResolvedValue(null);

      // Act & Assert
      await expect(service.getBlockTransactionCount(blockNumber)).rejects.toThrow(
        `Failed to get block ${blockNumber}: Block ${blockNumber} not found`,
      );
    });

    it('should handle connection errors properly', async () => {
      // Arrange
      const blockNumber = 123456;
      const connectionError = new Error('RPC connection failed');
      mockConnection.getBlock.mockRejectedValue(connectionError);

      // Act & Assert
      await expect(service.getBlockTransactionCount(blockNumber)).rejects.toThrow(
        `Failed to get block ${blockNumber}: RPC connection failed`,
      );
    });

    it('should return data in expected format', async () => {
      // Arrange
      const blockNumber = 123456;
      mockConnection.getBlock.mockResolvedValue(mockBlock);

      // Act
      const result = await service.getBlockTransactionCount(blockNumber);

      // Assert - Check exact format
      expect(result).toEqual(
        expect.objectContaining({
          transactionCount: expect.any(Number),
        }),
      );
      expect(Object.keys(result)).toEqual(['transactionCount']);
    });
  });
});
