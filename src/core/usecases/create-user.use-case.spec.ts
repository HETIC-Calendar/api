import { CreateUserUseCase, CreateUserCommand } from './create-user.use-case';
import { UserRepository } from '../domain/repository/user.repository';
import { InMemoryUserRepository } from '../../adapters/in-memory/in-memory-user.repository copy';

describe('CreateUserUseCase', () => {
  let userRepository: UserRepository;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it('should be defined', () => {
    expect(createUserUseCase).toBeDefined();
  });

  it('should return created room', async () => {
    // Given
    const command: CreateUserCommand = {
      email: 'john.doe@example.com',
      password: 'password123',
    };

    // When
    const user = await createUserUseCase.execute(command);

    // Then
    const users = await userRepository.findAll();
    expect(users.length).toEqual(1);
    expect(user).toEqual({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: expect.any(String),
      email: 'john.doe@example.com',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      password: expect.any(String),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      createdAt: expect.any(Date),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      updatedAt: expect.any(Date),
    });
    expect(user.password).not.toEqual(command.password);
  });
});
