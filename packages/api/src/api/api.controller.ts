import { Controller, Get, Param, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { SolanaService } from '../blockchain/solana/solana.service';

@Controller('api')
export class ApiController {
  constructor(private readonly solanaService: SolanaService) {}

  /**
   * Get transaction count for a specific Solana block
   * @param blockNumber The block number (slot) to query
   */
  @Get('solana/block/:blockNumber/transactions')
  async getBlockTransactionCount(@Param('blockNumber') blockNumber: string) {
    const blockNum = parseInt(blockNumber, 10);
      
      if (isNaN(blockNum) || blockNum < 0) {
        throw new BadRequestException(
          'Invalid block number. Must be a positive integer.',
        );
      }

      const result = await this.solanaService.getBlockTransactionCount(blockNum);
      return {
        success: true,
        data: result,
      };
  }
}