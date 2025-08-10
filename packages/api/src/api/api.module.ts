import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { ApiController } from './api.controller';

@Module({
  imports: [
    BlockchainModule.registerAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        mainnet: configService.get<string>('APP_ENV') === 'production',
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ApiController],
  providers: [],
})
export class ApiModule {}