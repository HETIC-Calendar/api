import { Module } from '@nestjs/common';
import { HelloWorldUseCase } from './core/usecases/hello-world.use-case';
import { HelloWorldController } from './adapters/api/controller/hello-world.controller';

@Module({
  imports: [],
  controllers: [HelloWorldController],
  providers: [
    {
      provide: HelloWorldUseCase,
      useFactory: () => new HelloWorldUseCase(),
      inject: [],
    },
  ],
})
export class AppModule {}
