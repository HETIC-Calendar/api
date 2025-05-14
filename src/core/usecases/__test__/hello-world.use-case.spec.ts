import { HelloWorldCommand, HelloWorldUseCase } from '../hello-world.use-case';

describe('HelloWorldUseCase', () => {
  let helloWorldUseCase: HelloWorldUseCase;

  beforeEach(() => {
    helloWorldUseCase = new HelloWorldUseCase();
  });

  it('should be defined', () => {
    expect(helloWorldUseCase).toBeDefined();
  });

  it('should return "Hello, world!"', () => {
    // Given
    const command: HelloWorldCommand = {
      name: 'John Doe',
    };

    // When
    const helloWorld = helloWorldUseCase.execute(command);

    // Then
    expect(helloWorld).toEqual('Hello, John Doe!');
  });

  it('should throw an error if name is not provided', () => {
    // Given
    const command: HelloWorldCommand = {
      name: '',
    };

    // When
    const execute = () => helloWorldUseCase.execute(command);

    // Then
    expect(execute).toThrow('Name is required!');
  });
});
