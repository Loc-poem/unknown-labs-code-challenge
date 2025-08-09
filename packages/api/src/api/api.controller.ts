import { Controller } from '@nestjs/common';
import { SolanaService } from '../blockchain/solana/solana.service';

@Controller('api')
export class ApiController {
  constructor(private readonly solanaService: SolanaService) {}
}