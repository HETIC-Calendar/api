import { HelloWorldCommand } from '../../../core/usecases/hello-world.use-case';
import { HelloWorldRequest } from '../request/hello-world.request';

export class HelloWorldMapper {
  static toDomain(request: HelloWorldRequest): HelloWorldCommand {
    return { name: request.name };
  }
}
