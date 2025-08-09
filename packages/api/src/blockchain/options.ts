import { ModuleMetadata, Type } from '@nestjs/common';

/**
 * Blockchain configuration options
 */
export interface BlockchainOptions {
  /**
   * Whether to use mainnet (true) or testnet/devnet (false)
   */
  mainnet: boolean;
}

/**
 * Factory interface for creating blockchain options asynchronously
 */
export interface BlockchainAsyncOptionsFactory {
  createOptions(): Promise<BlockchainOptions> | BlockchainOptions;
}

/**
 * Async configuration options for blockchain module
 */
export interface BlockchainAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  /**
   * Whether the module should be global
   */
  isGlobal?: boolean;

  /**
   * Factory function to create blockchain options
   */
  useFactory?: (...args: any[]) => Promise<BlockchainOptions> | BlockchainOptions;

  /**
   * Dependencies to inject into the factory function
   */
  inject?: any[];

  /**
   * Existing provider to use for creating options
   */
  useExisting?: Type<BlockchainAsyncOptionsFactory>;

  /**
   * Class to use for creating options
   */
  useClass?: Type<BlockchainAsyncOptionsFactory>;
}
