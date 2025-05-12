import { Test, TestingModule } from '@nestjs/testing';
import { HelloWorldUseCase } from '../../../core/usecases/hello-world.use-case';
import { HelloWorldController } from './hello-world.controller';

describe('HelloWorldController', () => {
  let helloWorldController: HelloWorldController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HelloWorldController],
      providers: [
        {
          provide: HelloWorldUseCase,
          useFactory: () => new HelloWorldUseCase(),
          inject: [],
        },
      ],
    }).compile();

    helloWorldController = app.get<HelloWorldController>(HelloWorldController);
  });

  describe('root', () => {
    it('should return "Hello John Doe!"', () => {
      expect(helloWorldController.getHello('John Doe')).toBe(
        'Hello, John Doe!',
      );
    });

    it('should throw an error if name is not provided', () => {
      expect(() => helloWorldController.getHello('')).toThrow(
        'Name is required!',
      );
    });
  });
});
