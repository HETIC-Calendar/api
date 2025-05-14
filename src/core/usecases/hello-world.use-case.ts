import { UseCase } from '@core/base/use-case';
import { NameRequiredError } from '@core/domain/error/NameRequiredError';

export type HelloWorldCommand = {
  name: string;
};

export class HelloWorldUseCase implements UseCase<HelloWorldCommand, string> {
  execute(command: HelloWorldCommand): string {
    if (!command.name) {
      throw new NameRequiredError('Name is required!');
    }

    return `Hello, ${command.name}!`;
  }
}
