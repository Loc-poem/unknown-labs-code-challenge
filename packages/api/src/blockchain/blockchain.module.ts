import { DynamicModule, Module, Type } from '@nestjs/common';
import { SOLANA_NETWORKS } from '@coding-challenge/shared/constants';
import { SolanaService } from './solana/solana.service';
import {
  BlockchainAsyncOptions,
  BlockchainAsyncOptionsFactory,
  BlockchainOptions,
} from './options';
import { web3 } from '@coral-xyz/anchor';

@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
export class BlockchainModule {
  /**
   * Register blockchain module with async configuration
   * @param options Configuration options
   */
  static registerAsync(options: BlockchainAsyncOptions): DynamicModule {
    return {
      global: options.isGlobal || false,
      module: BlockchainModule,
      providers: [
        ...this.createSolanaConnectionProvider(options),
        SolanaService,
      ],
      exports: [
        'SOLANA_CONNECTION',
        SolanaService,
      ],
    };
  }

  private static createSolanaConnectionProvider(
    options: BlockchainAsyncOptions,
  ) {
    if (options.useFactory) {
      return [
        {
          provide: 'SOLANA_CONNECTION',
          useFactory: async (inject: any[]) => {
            const blockchainOptions = await options.useFactory?.(inject);
            const network = blockchainOptions?.mainnet ? 'MAINNET' : 'DEVNET';
            const solanaNetwork = SOLANA_NETWORKS[network];
            return new web3.Connection(solanaNetwork.rpcUrl);
          },
          inject: options.inject || [],
        },
      ];
    }

    if (options.useExisting) {
      const inject = [options.useExisting as Type<BlockchainAsyncOptionsFactory>];
      return [
        {
          provide: 'SOLANA_CONNECTION',
          useFactory: async (optionsFactory: BlockchainAsyncOptionsFactory) => {
            const blockchainOptions = await optionsFactory.createOptions();
            const network = blockchainOptions?.mainnet ? 'MAINNET' : 'DEVNET';
            const solanaNetwork = SOLANA_NETWORKS[network];
            return new web3.Connection(solanaNetwork.rpcUrl);
          },
          inject,
        },
      ];
    }

    throw new Error('Either useFactory or useExisting must be provided');
  }
}