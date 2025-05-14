import { HelloWorldRequest } from '@adapters/api/request/hello-world.request';
import { HelloWorldCommand } from '@core/usecases/hello-world.use-case';

export class HelloWorldMapper {
  static toDomain(request: HelloWorldRequest): HelloWorldCommand {
    return { name: request.name };
  }
}
