import { UseCase } from '../base/use-case';
import { NameRequiredError } from '../domain/error/NameRequiredError';

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
