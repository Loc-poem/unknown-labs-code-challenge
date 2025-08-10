import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { ApiController } from './api.controller';
import { SolanaService } from '../blockchain/solana/solana.service';

describe('ApiController', () => {
  let controller: ApiController;
  let solanaService: jest.Mocked<SolanaService>;

  const mockTransactionCountResult = {
    transactionCount: 42,
  };

  beforeEach(async () => {
    const mockSolanaService = {
      getBlockTransactionCount: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [
        {
          provide: SolanaService,
          useValue: mockSolanaService,
        },
      ],
    }).compile();

    controller = module.get<ApiController>(ApiController);
    solanaService = module.get(SolanaService);
  });

  describe('getBlockTransactionCount', () => {
    it('should return transaction count in expected format for valid block number', async () => {
      // Arrange
      const blockNumber = '123456';
      solanaService.getBlockTransactionCount.mockResolvedValue(mockTransactionCountResult);

      // Act
      const result = await controller.getBlockTransactionCount(blockNumber);

      // Assert
      expect(result).toEqual({
        success: true,
        data: {
          transactionCount: 42,
        },
      });
      
      // Verify the response structure
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('data');
      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('transactionCount');
      expect(typeof result.data.transactionCount).toBe('number');
      expect(solanaService.getBlockTransactionCount).toHaveBeenCalledWith(123456);
    });

    it('should throw BAD_REQUEST for invalid block number (non-numeric)', async () => {
      // Arrange
      const invalidBlockNumber = 'invalid';

      // Act & Assert
      await expect(controller.getBlockTransactionCount(invalidBlockNumber))
        .rejects
        .toThrow(BadRequestException);

      try {
        await controller.getBlockTransactionCount(invalidBlockNumber);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
        expect(error.message).toBe('Invalid block number. Must be a positive integer.');
      }

      expect(solanaService.getBlockTransactionCount).not.toHaveBeenCalled();
    });

    it('should throw BAD_REQUEST for negative block number', async () => {
      // Arrange
      const negativeBlockNumber = '-123';

      // Act & Assert
      await expect(controller.getBlockTransactionCount(negativeBlockNumber))
        .rejects
        .toThrow(BadRequestException);

      try {
        await controller.getBlockTransactionCount(negativeBlockNumber);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
        expect(error.message).toBe('Invalid block number. Must be a positive integer.');
      }

      expect(solanaService.getBlockTransactionCount).not.toHaveBeenCalled();
    });

    it('should parse decimal numbers as integers (parseInt behavior)', async () => {
      // Arrange
      const decimalBlockNumber = '123.45';
      const mockResult = { transactionCount: 5 };
      solanaService.getBlockTransactionCount.mockResolvedValue(mockResult);

      // Act
      const result = await controller.getBlockTransactionCount(decimalBlockNumber);

      // Assert - parseInt('123.45', 10) returns 123
      expect(result).toEqual({
        success: true,
        data: {
          transactionCount: 5,
        },
      });
      expect(solanaService.getBlockTransactionCount).toHaveBeenCalledWith(123);
    });

    it('should propagate service errors as-is', async () => {
      // Arrange
      const blockNumber = '123456';
      const serviceError = new Error('Block not found');
      solanaService.getBlockTransactionCount.mockRejectedValue(serviceError);

      // Act & Assert
      await expect(controller.getBlockTransactionCount(blockNumber))
        .rejects
        .toThrow('Block not found');

      try {
        await controller.getBlockTransactionCount(blockNumber);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Block not found');
        // No getStatus method since it's a plain Error, not HttpException
      }

      expect(solanaService.getBlockTransactionCount).toHaveBeenCalledWith(123456);
    });

    it('should return data in exact expected API format', async () => {
      // Arrange
      const blockNumber = '999999';
      const mockResult = { transactionCount: 157 };
      solanaService.getBlockTransactionCount.mockResolvedValue(mockResult);

      // Act
      const result = await controller.getBlockTransactionCount(blockNumber);

      // Assert - Test exact API response format
      expect(result).toMatchObject({
        success: true,
        data: {
          transactionCount: 157,
        },
      });

      // Ensure no extra properties
      expect(Object.keys(result)).toEqual(['success', 'data']);
      expect(Object.keys(result.data)).toEqual(['transactionCount']);
      
      // Type checks
      expect(typeof result.success).toBe('boolean');
      expect(typeof result.data).toBe('object');
      expect(typeof result.data.transactionCount).toBe('number');
    });
  });
});
