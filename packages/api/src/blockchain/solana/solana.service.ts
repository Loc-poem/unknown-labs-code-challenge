import { Injectable, Inject } from '@nestjs/common';
import { web3 } from '@coral-xyz/anchor';

@Injectable()
export class SolanaService {
  constructor(
    @Inject('SOLANA_CONNECTION')
    private readonly solanaConnection: web3.Connection,
  ) {}
}