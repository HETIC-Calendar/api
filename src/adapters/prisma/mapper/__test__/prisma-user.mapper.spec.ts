import { PrismaUserMapper } from '../prisma-user.mapper';
import { User } from '../../../../core/domain/model/User';
import { User as UserEntity, $Enums } from '@prisma/client';
import { UserType } from '../../../../core/domain/type/UserType';

describe('PrismaUserMapper', () => {
  const mapper = new PrismaUserMapper();

  const userTypeMappings: { domain: UserType; prisma: $Enums.UserType }[] = [
    { domain: UserType.PLANNER, prisma: $Enums.UserType.PLANNER },
    { domain: UserType.SPEAKER, prisma: $Enums.UserType.SPEAKER },
  ];

  it.each(userTypeMappings)(
    'should map User to UserEntity for %s',
    ({ domain, prisma }) => {
      // Given
      const user: User = {
        id: 'user-1',
        email: 'user@example.com',
        password: 'securepassword123',
        type: domain,
        updatedAt: new Date('2023-10-01T10:00:00Z'),
        createdAt: new Date('2023-10-01T11:00:00Z'),
      };

      // When
      const entity = mapper.fromDomain(user);

      // Then
      expect(entity).toEqual({
        id: 'user-1',
        email: 'user@example.com',
        password: 'securepassword123',
        type: prisma,
        updatedAt: new Date('2023-10-01T10:00:00Z'),
        createdAt: new Date('2023-10-01T11:00:00Z'),
      });
    },
  );

  it.each(userTypeMappings)(
    'should map UserEntity to User for %s',
    ({ domain, prisma }) => {
      // Given
      const entity: UserEntity = {
        id: 'user-1',
        email: 'user@example.com',
        password: 'securepassword123',
        type: prisma,
        updatedAt: new Date('2023-10-01T10:00:00Z'),
        createdAt: new Date('2023-10-01T11:00:00Z'),
      };

      // When
      const user = mapper.toDomain(entity);

      // Then
      expect(user).toEqual({
        id: 'user-1',
        email: 'user@example.com',
        password: 'securepassword123',
        type: domain,
        updatedAt: new Date('2023-10-01T10:00:00Z'),
        createdAt: new Date('2023-10-01T11:00:00Z'),
      });
    },
  );

  it('should throw an error for an invalid user type', () => {
    // Given
    const invalidEntity: UserEntity = {
      id: 'user-1',
      email: 'user@example.com',
      password: 'securepassword123',
      type: 'INVALID_TYPE' as $Enums.UserType,
      updatedAt: new Date('2023-10-01T10:00:00Z'),
      createdAt: new Date('2023-10-01T11:00:00Z'),
    };

    // When / Then
    expect(() => mapper.toDomain(invalidEntity)).toThrow('Invalid user type');
  });
});
