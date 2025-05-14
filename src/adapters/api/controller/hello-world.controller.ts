import { Controller, Get, Query } from '@nestjs/common';
import { HelloWorldMapper } from '@adapters/api/mapper/hello-world.mapper';
import { HelloWorldRequest } from '@adapters/api/request/hello-world.request';
import { HelloWorldUseCase } from '@core/usecases/hello-world.use-case';

@Controller()
export class HelloWorldController {
  constructor(private readonly helloWorldUseCase: HelloWorldUseCase) {}

  @Get()
  getHello(@Query('name') name: string): string {
    const request: HelloWorldRequest = { name };
    const command = HelloWorldMapper.toDomain(request);
    return this.helloWorldUseCase.execute(command);
  }
}
