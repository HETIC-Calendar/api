import { Controller, Get, Query } from '@nestjs/common';
import { HelloWorldUseCase } from '../../../core/usecases/hello-world.use-case';
import { HelloWorldMapper } from '../mapper/hello-world.mapper';
import { HelloWorldRequest } from '../request/hello-world.request';

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
